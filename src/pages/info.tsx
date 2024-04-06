import { Grid, TextField } from '@mui/material';
import Button from '@arcblock/ux/lib/Button';
import { useLocaleContext } from '@arcblock/ux/lib/Locale/context';
import { FC, Reducer, useReducer } from 'react';
import style from './info.module.css';
import locales from './locales';

const initialState = {
  isEditing: false,
  value: {
    username: 'abc',
    email: 'def',
    phone: 'ghi',
  },
  input: {
    username: 'abc',
    email: 'def',
    phone: 'ghi',
  },
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

  return (
    <div className={style.container}>
      <Grid container spacing={2}>
        {config.map(([key]) => {
          return (
            <Grid key={key} item xs={8} lg="auto">
              <TextField
                variant="standard"
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
      <Grid container spacing={2}>
        {' '}
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
                variant="contained"
                onClick={() => {
                  // TODO: cancel
                  dispatch({ type: 'toggle-edit' });
                }}>
                {t.cancel}
              </Button>
            </>
          ) : (
            <Button
              onClick={() => {
                dispatch({ type: 'toggle-edit' });
              }}>
              {t.edit}
            </Button>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Info;
