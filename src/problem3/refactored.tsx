enum EBlockchain {
  Osmosis = "Osmosis",
  Ethereum = "Ethereum",
  Arbitrum = "Arbitrum",
  Zilliqa = "Zilliqa",
  Neo = "Neo",
  Unknown = "Unknown",
}

const BLOCKCHAIN_PRIORITY = {
  [EBlockchain.Osmosis]: 100,
  [EBlockchain.Ethereum]: 50,
  [EBlockchain.Arbitrum]: 30,
  [EBlockchain.Zilliqa]: 20,
  [EBlockchain.Neo]: 20,
  [EBlockchain.Unknown]: -99,
};

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: EBlockchain;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
  usdValue: number;
}

interface Props extends BoxProps {}
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const sortedBalances = useMemo(() => {
    return balances
      .filter(
        (balance: WalletBalance) =>
          balance.blockchain !== EBlockchain.Unknown && balance.amount > 0
      )
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = BLOCKCHAIN_PRIORITY[lhs.blockchain];
        const rightPriority = BLOCKCHAIN_PRIORITY[rhs.blockchain];
        return rightPriority - leftPriority;
      })
      .map((balance: WalletBalance) => ({
        ...balance,
        formatted: balance.amount.toFixed(),
        usdValue: balance.amount * prices[balance.currency],
      }));
  }, [balances, prices]);

  const rows = sortedBalances.map((balance: FormattedWalletBalance) => {
    return (
      <WalletRow
        className={classes.row}
        key={balance.currency}
        amount={balance.amount}
        usdValue={balance.usdValue}
        formattedAmount={balance.formatted}
      />
    );
  });

  return <div {...rest}>{rows}</div>;
};
