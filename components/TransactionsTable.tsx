import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { transactionCategoryStyles } from "@/constants";
import {
  cn,
  formatAmount,
  formatDateTime,
  getTransactionStatus,
  removeSpecialCharacters,
} from "@/lib/utils";

const CategoryBadge = ({ category }: CategoryBadgeProps) => {
  const {
    borderColor,
    backgroundColor,
    textColor,
    chipBackgroundColor,
  } =
    transactionCategoryStyles[category as keyof typeof transactionCategoryStyles] ||
    transactionCategoryStyles.default;

  return (
    <div className={cn("category-badge", borderColor, chipBackgroundColor)}>
      <div className={cn("size-2 rounded-full", backgroundColor)} />
      <p className={cn("text-[12px] font-medium", textColor)}>{category}</p>
    </div>
  );
};

const TransactionsTable = ({ transactions }: TransactionTableProps) => {
  transactions = transactions || [];

//Dummy transaction
  const dummyTransactions: Transactions[] = [
    {
      id: "1",
      name: "Schoolarship funds",
      amount: 1500,
      type: "credit",
      date: new Date().toISOString(),
      paymentChannel: "Bank",
      category: "Salary",
    },
    {
      id: "2",
      name: "Schoolarship funds",
      amount: 1900,
      type: "credit",
      date: new Date().toISOString(),
      paymentChannel: "Bank",
      category: "Salary",
    },
    {
      id: "3",
      name: "Freelance work",
      amount: 1200,
      type: "credit",
      date: new Date().toISOString(),
      paymentChannel: "Bank",
      category: "Freelance",
    },
    {
      id: "4",
      name: "Grocery shopping",
      amount: -200,
      type: "debit",
      date: new Date().toISOString(),
      paymentChannel: "Card",
      category: "Groceries",
    },
    {
      id: "5",
      name: "Gym membership",
      amount: -50,
      type: "debit",
      date: new Date().toISOString(),
      paymentChannel: "Card",
      category: "Health",
    },
    {
      id: "6",
      name: "Summer sales",
      amount: 750,
      type: "credit",
      date: new Date().toISOString(),
      paymentChannel: "Online",
      category: "Shopping",
    },
  {
    id: "7",
    name: "Electricity bill",
    amount: -100,
    type: "credit",
    date: new Date().toISOString(),
    paymentChannel: "Bank",
    category: "Utilities",
  },
  {
    id: "8",
    name: "Book purchase",
    amount: 30,
    type: "credit",
    date: new Date().toISOString(),
    paymentChannel: "Online",
    category: "Education",
  },
  {
    id: "9",
    name: "Car repair",
    amount: 500,
    type: "credit",
    date: new Date().toISOString(),
    paymentChannel: "Card",
    category: "Maintenance",
  },
  {
    id: "10",
    name: "Dinner at restaurant",
    amount: -80,
    type: "credit",
    date: new Date().toISOString(),
    paymentChannel: "Card",
    category: "Dining",
  },
  {
    id: "11",
    name: "Monthly pocket money",
    amount: 1200,
    type: "credit",
    date: new Date().toISOString(),
    paymentChannel: "Bank",
    category: "Rent",
  },
  {
    id: "12",
    name: "Concert tickets",
    amount: -150,
    type: "debit",
    date: new Date().toISOString(),
    paymentChannel: "Online",
    category: "Entertainment",
  }
  ];

  const allTransactions = [...dummyTransactions, ...transactions];

  return (
    <Table>
      <TableHeader className="bg-[#f9fafb]">
        <TableRow>
          <TableHead className="px-2">Transaction</TableHead>
          <TableHead className="px-2">Amount</TableHead>
          <TableHead className="px-2">Status</TableHead>
          <TableHead className="px-2">Date</TableHead>
          <TableHead className="px-2 max-md:hidden">Channel</TableHead>
          <TableHead className="px-2 max-md:hidden">Category</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {allTransactions.map((t) => {
          const status = getTransactionStatus(new Date(t.date));
          const amount = formatAmount(t.amount);

          const isDebit = t.type === "debit";
          const isCredit = t.type === "credit";

          return (
            <TableRow
              key={t.id}
              className={`${
                isDebit || amount[0] === "-" ? "bg-[#FFFBFA]" : "bg-[#F6FEF9]"
              } !over:bg-none !border-b-DEFAULT`}
            >
              <TableCell className="max-w-[250px] pl-2 pr-10">
                <div className="flex items-center gap-3">
                  <h1 className="text-14 truncate font-semibold text-[#344054]">
                    {removeSpecialCharacters(t.name)}
                  </h1>
                </div>
              </TableCell>

              <TableCell
                className={`pl-2 pr-10 font-semibold ${
                  isDebit || amount[0] === "-" ? "text-[#f04438]" : "text-[#039855]"
                }`}
              >
                {isDebit ? `-${amount}` : isCredit ? amount : amount}
              </TableCell>

              <TableCell className="pl-2 pr-10">
                <CategoryBadge category={status} />
              </TableCell>

              <TableCell className="min-w-32 pl-2 pr-10">
                {formatDateTime(new Date(t.date)).dateTime}
              </TableCell>

              <TableCell className="pl-2 pr-10 capitalize min-w-24">
                {t.paymentChannel}
              </TableCell>

              <TableCell className="pl-2 pr-10 max-md:hidden">
                <CategoryBadge category={t.category} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TransactionsTable;
