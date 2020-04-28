const Transaction = require('../models/Transaction');

// @desc Get all transactions
// @route GET /api/v1/transactions
// @access public

exports.getTransactions = async (req, res, next) => {
	try {
		const transactions = await Transaction.find();
		return res.status(200).json({
			success: true,
			count: transactions.length,
			data: transactions,
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			error: 'Server error',
		});
	}
};

// @desc Add transaction
// @route POST /api/v1/transactions
// @access public

exports.addTransaction = async (req, res, next) => {
	// res.send('POST transaction');
	try {
		const { text, amount } = req.body;
		const transaction = await Transaction.create(req.body);
		return res.status(201).json({
			success: true,
			data: transaction,
		});
	} catch (err) {
		console.log(err);
		if (err.name === 'ValidationError') {
			const messages = Object.values(err.errors).map((val) => val.message);
			res.status(400).json({
				success: false,
				error: messages,
			});
		} else {
			return res.status(500).json({
				success: false,
				error: 'Server error',
			});
		}
	}
};

// @desc delete a transaction
// @route DELETE /api/v1/transactions/:id
// @access public

exports.deleteTransaction = async (req, res, next) => {
	// res.send('DELETE transaction');
	try {
		const transaction = await Transaction.findById(req.params.id);

		if (!transaction) {
			return res.status(404).json({
				success: false,
				error: 'no transaction found',
			});
		}

		await transaction.remove();
		res.status(200).json({
			success: true,
			data: {},
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			error: 'seerver error',
		});
	}
};
