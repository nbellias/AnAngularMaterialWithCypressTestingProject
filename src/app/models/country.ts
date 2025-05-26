export interface Country {
  name: {
    common: string;
    official: string;
  };
  capital: string[];
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
}
