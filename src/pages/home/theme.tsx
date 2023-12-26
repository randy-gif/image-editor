
const PRIMARY_COLOR = '#09c'
const SECONDARY_COLOR = '#383a3e'

export interface Theme {
    textColor: string;
    backgroundColor: string;
    primaryColor: string;
    secondaryColor: string;
    input: {
        backgroundColor: string;
        borderColor: string;
        textColor: string;
    }
    button: {
        primaryColor: {
            backgroundColor: string;
            textColor: string;
        }
        secondaryColor: {
            backgroundColor: string;
            textColor: string;
        }
    }
    group: {
        backgroundColor: string;
        borderColor: string;
    }
}

export const darkTheme: object = {
  textColor: '#f5f5f5',
  backgroundColor: '#292c31',
  primaryColor: PRIMARY_COLOR,
  secondaryColor: SECONDARY_COLOR,
  input: {
    backgroundColor: '#24262b',
    borderColor: '#464b5370',
    textColor: '#f5f5f5'
  },
  button: {
    primaryColor: {
      backgroundColor: PRIMARY_COLOR,
      textColor: '#f5f5f5'
    },
    secondaryColor: {
      backgroundColor: SECONDARY_COLOR,
      textColor: '#f5f5f5'
    }
  },
  group: {
    backgroundColor: '#272a2e',
    borderColor: '#464b5370'
  }
};

export const lightTheme: object = {
};