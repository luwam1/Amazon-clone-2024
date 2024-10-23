import { CurrencyFormat } from "react-currency-format";
<CurrencyFormat
  value={total}
  displayType={"text"}
  decimalScale={2}
  thousandSeparator={true}
  prefix={"$"}
  renderText={(value) => <p>{value}</p>}
/>;
