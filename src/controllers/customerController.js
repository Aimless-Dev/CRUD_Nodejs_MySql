const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM customer', (err, customers) => {
            if (err){
                res.json(err);
            }
            res.render('customers', {
                data: customers
            });
        });
    });
};

controller.save = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO customer SET ?', [data], (err, customer) => {
            res.redirect('/');   
        });
    });
};

controller.delete = (req, res) => {
    const id = req.params.id;
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM customer WHERE id = ?', [id], (err, rows) => {
            res.redirect('/');
        });
    });
};

controller.edit = (req, res) => {
    const id = req.params.id;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM customer WHERE id = ?', [id], (err, rows) => {
            res.render('customers_edit', {
                data: rows[0]
            });
        });
    });
};

controller.update = (req, res) => {
    const id = req.params.id;
    const newDate = req.body;
    req.getConnection((err, conn) => {
        conn.query('UPDATE customer SET ? WHERE id = ?', [newDate, id], (err, rows) => {
            res.redirect('/');
        });
    });
};

module.exports = controller;