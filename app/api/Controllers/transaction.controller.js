const transactionService = require('../Services/transaction.service');
const transactionValidation = require('../Validations/transaction');

exports.get = async (req, res, next) => {
    try {
        const transactionService = new TransactionService();
        const transactions = await transactionService.get();

        data = {
            user: transactions.user.name,
            transactionList: transactions.transactionList,
            totalPrice: transactions.totalPrice
        }

        return res.status(200).json({
            message: 'Successfully get transactions',
            data: data
        });
    } catch (error) {
        next(error);
    }
}