import { Container, Grid, TextField } from '@mui/material';
import Button from '@arcblock/ux/lib/Button';
import { useLocaleContext } from '@arcblock/ux/lib/Locale/context';
import ActivityIndicator from '@arcblock/ux/lib/ActivityIndicator';
import { FC, Reducer, useEffect, useReducer } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Toast from '@arcblock/ux/lib/Toast';
import style from './info.module.css';
import locales from './locales';
import axios from './libs/api';
import { Profile } from '../common/types';
import rules from '../common/rules';

type State = {
  isEditing: boolean;
  isSaving: boolean;
  current?: Profile;
};
type Action =
  | { type: 'init'; data: Profile }
  | { type: 'enter-edit' }
  | { type: 'start-save' }
  | { type: 'commit'; data: Profile }
  | { type: 'cancel' };

const initialState: State = {
  isEditing: false,
  isSaving: false,
};
const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'init':
      return {
        ...state,
        current: action.data,
      };
    case 'enter-edit':
      return {
        ...state,
        isEditing: true,
      };
    case 'start-save':
      return {
        ...state,
        isSaving: true,
      };
    case 'commit':
      return {
        ...state,
        current: action.data,
        isEditing: false,
        isSaving: false,
      };
    case 'cancel':
      return {
        ...state,
        isEditing: false,
      };
    default:
      return state;
  }
};

const Info: FC = function Info() {
  const [{ isEditing, isSaving, current }, dispatch] = useReducer(reducer, initialState);
  const { locale } = useLocaleContext();
  const t = locales[locale as keyof typeof locales] ?? locales.en;

  const config = [
    ['username'], //
    ['email'],
    ['phone'],
  ] as const;
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Profile>({ values: current });

  const onSubmit: SubmitHandler<Profile> = async (profile) => {
    dispatch({ type: 'start-save' });
    await axios.put('/api/profile', profile);
    dispatch({ type: 'commit', data: profile });

    Toast.success(t.saveSucceed);
  };

  useEffect(() => {
    const init = async () => {
      const res = await axios.get<Profile>('/api/profile');
      dispatch({ type: 'init', data: res.data });
    };
    init();
  }, []);

  return (
    <Container className={style.container} maxWidth="lg">
      {current ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {config.map(([key]) => {
              return (
                <Grid key={key} item xs={12} sm={6} md={4}>
                  <TextField
                    variant={isEditing ? undefined : 'standard'}
                    fullWidth
                    label={t[key]}
                    InputProps={{
                      readOnly: !isEditing,
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={errors[key] != null}
                    {...register(key, {
                      required: true,
                      validate: (value) => rules[key]?.test(value) ?? true,
                    })}
                  />
                </Grid>
              );
            })}
          </Grid>
          <Grid container spacing={2} style={{ paddingTop: 12 }}>
            {isEditing ? (
              <>
                <Grid item xs="auto">
                  <Button disabled={isSaving} loading={isSaving} variant="contained" type="submit">
                    {t.save}
                  </Button>
                </Grid>
                <Grid item xs="auto">
                  <Button
                    disabled={isSaving}
                    variant="outlined"
                    onClick={(e: Event) => {
                      e.preventDefault();
                      reset();
                      dispatch({ type: 'cancel' });
                    }}>
                    {t.cancel}
                  </Button>
                </Grid>
              </>
            ) : (
              <Grid item xs="auto">
                <Button
                  variant="contained"
                  onClick={(e: Event) => {
                    e.preventDefault();
                    dispatch({ type: 'enter-edit' });
                  }}>
                  {t.edit}
                </Button>
              </Grid>
            )}
          </Grid>
        </form>
      ) : (
        <Grid display="flex" justifyContent="center" alignItems="center">
          <ActivityIndicator />
        </Grid>
      )}
    </Container>
  );
};

export default Info;
