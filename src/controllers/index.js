const getPageTitle = (pageName) => {
    const pageTitles = {
        home: 'Home',
        organizations: 'Our Partner Organizations',
        projects: 'Service Projects',
        categories: 'Service Categories'
    };

    if (!pageTitles[pageName]) {
        return 'CSE 340 Service Network';
    }

    return pageTitles[pageName];
};

const showHomePage = async (req, res) => {
    const title = getPageTitle('home');
    res.render('home', { title });
};

export { showHomePage };
