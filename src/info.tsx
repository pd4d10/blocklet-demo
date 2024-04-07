import { Container, Grid, TextField } from '@mui/material';
import Button from '@arcblock/ux/lib/Button';
import { useLocaleContext } from '@arcblock/ux/lib/Locale/context';
import { FC, Reducer, useEffect, useReducer } from 'react';
import style from './info.module.css';
import locales from './locales';
import axios from './libs/api';
import { Profile } from '../common/types';

const initialState = {
  isEditing: false,
  value: {
    username: 'abc',
    email: 'def',
    phone: 'ghi',
  } as Profile,
  input: {
    username: 'abc',
    email: 'def',
    phone: 'ghi',
  } as Profile,
};
const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'toggle-edit':
      return {
        ...state,
        isEditing: !state.isEditing,
      };
    case 'update':
      return {
        ...state,
        input: {
          ...state.input,
          [action.field]: action.value,
        },
      };
    case 'commit':
      return state;
    default:
      return state;
  }
};

type State = typeof initialState;
type Action =
  | { type: 'toggle-edit' }
  | { type: 'update'; field: keyof State['input']; value: string }
  | { type: 'commit' };

const Info: FC = function Info() {
  const [{ input, isEditing }, dispatch] = useReducer(reducer, initialState);
  const { locale } = useLocaleContext();
  const t = locales[locale as keyof typeof locales] ?? locales.en;

  const config = [
    ['username'], //
    ['email'],
    ['phone'],
  ] as const;

  useEffect(() => {
    const init = async () => {
      await axios.get('/api/profile');
      // console.log(res);
    };
    init();
  }, []);

  return (
    <Container className={style.container} maxWidth="lg">
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
                  dispatch({ type: 'update', field: key, value: e.target.value });
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
                onClick={() => {
                  // TODO: save
                  dispatch({ type: 'toggle-edit' });
                }}>
                {t.save}
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  // TODO: cancel
                  dispatch({ type: 'toggle-edit' });
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
    </Container>
  );
};

export default Info;
