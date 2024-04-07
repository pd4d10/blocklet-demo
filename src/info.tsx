import { Container, Grid, TextField } from '@mui/material';
import Button from '@arcblock/ux/lib/Button';
import { useLocaleContext } from '@arcblock/ux/lib/Locale/context';
import ActivityIndicator from '@arcblock/ux/lib/ActivityIndicator';
import { FC, Reducer, useEffect, useReducer } from 'react';
import Toast from '@arcblock/ux/lib/Toast';
import style from './info.module.css';
import locales from './locales';
import axios from './libs/api';
import { Profile } from '../common/types';

type State = { isEditing: boolean; current?: Profile; input?: Profile };
type Action =
  | { type: 'init'; profile: Profile }
  | { type: 'toggle-edit' }
  | { type: 'add'; field: keyof Profile; value: string }
  | { type: 'commit' }
  | { type: 'cancel' };

const initialState: State = {
  isEditing: false,
};
const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'init':
      return {
        ...state,
        current: action.profile,
        input: action.profile,
      };
    case 'toggle-edit':
      return {
        ...state,
        isEditing: !state.isEditing,
      };
    case 'add':
      return {
        ...state,
        input: {
          ...state.input,
          [action.field]: action.value,
        },
      };
    case 'commit':
      return {
        ...state,
        current: state.input,
        isEditing: false,
      };
    case 'cancel':
      return {
        ...state,
        input: state.current,
        isEditing: false,
      };
    default:
      return state;
  }
};

const Info: FC = function Info() {
  const [{ isEditing, input, current }, dispatch] = useReducer(reducer, initialState);
  const { locale } = useLocaleContext();
  const t = locales[locale as keyof typeof locales] ?? locales.en;

  const config = [
    ['username'], //
    ['email'],
    ['phone'],
  ] as const;

  useEffect(() => {
    const init = async () => {
      const res = await axios.get<Profile>('/api/profile');
      dispatch({ type: 'init', profile: res.data });
    };
    init();
  }, []);

  return (
    <Container className={style.container} maxWidth="lg">
      {current && input ? (
        <>
          <Grid container spacing={4}>
            {config.map(([key]) => {
              return (
                <Grid key={key} item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    label={t[key]}
                    disabled={!isEditing}
                    value={input[key]}
                    onChange={(e) => {
                      dispatch({ type: 'add', field: key, value: e.target.value });
                    }}
                  />
                </Grid>
              );
            })}
          </Grid>
          <Grid container spacing={4}>
            <Grid item xs={8} lg="auto">
              {isEditing ? (
                <>
                  <Button
                    variant="contained"
                    onClick={async () => {
                      await axios.put('/api/profile', input);
                      Toast.success(t.saveSucceed);
                      dispatch({ type: 'commit' });
                    }}>
                    {t.save}
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      dispatch({ type: 'cancel' });
                    }}>
                    {t.cancel}
                  </Button>
                </>
              ) : (
                <Button
                  variant="contained"
                  onClick={() => {
                    dispatch({ type: 'toggle-edit' });
                  }}>
                  {t.edit}
                </Button>
              )}
            </Grid>
          </Grid>
        </>
      ) : (
        <Grid display="flex" justifyContent="center" alignItems="center">
          <ActivityIndicator />
        </Grid>
      )}
    </Container>
  );
};

export default Info;
