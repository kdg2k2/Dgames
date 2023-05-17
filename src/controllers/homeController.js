let getHomepage = async (req, res) => {
	return res.render('pages/homePage.ejs')
};

module.exports = {
	getHomepage,
};
