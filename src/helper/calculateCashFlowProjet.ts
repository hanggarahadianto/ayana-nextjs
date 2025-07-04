export const calculateCashOut = <T extends { total_cost: number }>(goods: T[] = []) => {
  return goods.reduce((acc, good) => acc + (good.total_cost || 0), 0);
};

export const calculateAccountBalance = (cashIn: number, cashOut: number) => {
  return cashIn - cashOut;
};
