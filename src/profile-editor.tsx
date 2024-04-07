import { Container, Grid, TextField } from '@mui/material';
import Button from '@arcblock/ux/lib/Button';
import ActivityIndicator from '@arcblock/ux/lib/ActivityIndicator';
import { FC, Reducer, useContext, useEffect, useReducer } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Toast from '@arcblock/ux/lib/Toast';
import { CopyButton } from '@arcblock/ux/lib/ClickToCopy';
import { axios } from './utils';
import { Profile } from '../common/types';
import rules from '../common/rules';
import { MyLocaleContext } from './context';

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

const ProfileEditor: FC = function Info() {
  const [{ isEditing, isSaving, current }, dispatch] = useReducer(reducer, initialState);
  const { t, locale } = useContext(MyLocaleContext);

  const {
    setFocus,
    getValues,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Profile>({ values: current });

  const onSubmit: SubmitHandler<Profile> = async (profile) => {
    dispatch({ type: 'start-save' });
    await axios.put('/api/profile', profile);
    dispatch({ type: 'commit', data: profile });
    Toast.success(t.saveSucceed, {
      autoHideDuration: 2000,
    });
  };

  useEffect(() => {
    const init = async () => {
      const res = await axios.get<Profile>('/api/profile');
      dispatch({ type: 'init', data: res.data });
    };
    init();
  }, []);

  // auto foucs the first input when start editing
  useEffect(() => {
    if (isEditing) {
      setFocus('username');
    }
  }, [isEditing, setFocus]);

  return (
    <Container
      maxWidth="lg"
      style={{
        padding: 20,
        height: 'calc(100vh - 64px - 68px)', // exclude header and footer
      }}>
      {current ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {(['username', 'email', 'phone'] as const).map((key) => {
              return (
                <Grid key={key} item xs={12} sm={6} md={4}>
                  <TextField
                    variant={isEditing ? undefined : 'standard'}
                    fullWidth
                    label={t[key]}
                    InputProps={{
                      readOnly: !isEditing,
                      endAdornment: isEditing ? undefined : <CopyButton locale={locale} content={getValues(key)} />,
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={errors[key] != null}
                    helperText={
                      // eslint-disable-next-line no-nested-ternary
                      errors[key]?.type === 'required'
                        ? t.noEmpty
                        : errors[key]?.type === 'validate'
                          ? t.invalidFormat
                          : undefined
                    }
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

export default ProfileEditor;
