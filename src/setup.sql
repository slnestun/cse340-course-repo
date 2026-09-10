-- ========================================
-- Organization Table
-- ========================================
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);
-- ========================================
-- Insert sample data: Organizations
-- ========================================
INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES (
        'BrightFuture Builders',
        'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
        'info@brightfuturebuilders.org',
        'brightfuture-logo.png'
    ),
    (
        'GreenHarvest Growers',
        'An urban farming collective promoting food sustainability and education in local neighborhoods.',
        'contact@greenharvest.org',
        'greenharvest-logo.png'
    ),
    (
        'UnityServe Volunteers',
        'A volunteer coordination group supporting local charities and service initiatives.',
        'hello@unityserve.org',
        'unityserve-logo.png'
    );
-- ========================================
-- Service Project Table
-- ========================================
CREATE TABLE service_project (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL REFERENCES organization(organization_id),
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    date DATE NOT NULL
);
-- ========================================
-- Insert sample data: Service Projects
-- ========================================
INSERT INTO service_project (
        organization_id,
        title,
        description,
        location,
        date
    )
VALUES (
        1,
        'Community Park Renovation',
        'Helping to renovate the local community park with sustainable materials.',
        'Downtown Community Center',
        '2023-10-15'
    ),
    (
        1,
        'Urban Garden Workshop',
        'A workshop to teach residents about urban gardening and food sustainability.',
        'City Hall',
        '2023-11-20'
    ),
    (
        1,
        'Senior Center Cleanup',
        'Assisting in the cleanup and improvement of the local senior center.',
        'Senior Center',
        '2023-12-05'
    ),
    (
        1,
        'Neighborhood Tree Planting',
        'Volunteers help plant native trees to improve air quality and shade in the neighborhood.',
        'Maple Street Park',
        '2024-02-10'
    ),
    (
        1,
        'School Recycling Drive',
        'Supporting environmental education and recycling efforts at the local school district.',
        'Riverside Elementary',
        '2024-03-18'
    ),
    (
        2,
        'Community Compost Training',
        'Teaching residents how to compost food waste and reduce landfill contributions.',
        'Northside Community Garden',
        '2024-01-12'
    ),
    (
        2,
        'Youth Farm-to-Table Event',
        'An educational event connecting students with local growers and healthy food habits.',
        'Lakeview School',
        '2024-02-22'
    ),
    (
        2,
        'Rain Barrel Installation',
        'Installing rain barrels to help neighborhoods conserve water and reduce runoff.',
        'Elm Street Homes',
        '2024-04-05'
    ),
    (
        2,
        'Local Produce Market Day',
        'Organizing a neighborhood market to distribute fresh produce and share farming tips.',
        'Central Plaza',
        '2024-05-17'
    ),
    (
        2,
        'Sustainable Seed Swap',
        'A community exchange where residents share seeds and learn about climate-smart gardening.',
        'Oak Avenue Library',
        '2024-06-08'
    ),
    (
        3,
        'Food Pantry Packing Day',
        'Helping package and sort donations for families in need across the region.',
        'Hope House',
        '2024-01-25'
    ),
    (
        3,
        'Disaster Relief Support',
        'Coordinating volunteer teams to assist with community preparedness and emergency supplies.',
        'City Emergency Center',
        '2024-02-14'
    ),
    (
        3,
        'Senior Outreach Visits',
        'Providing companionship and practical support to older adults in the community.',
        'Westview Apartments',
        '2024-03-09'
    ),
    (
        3,
        'Neighborhood Clean Sweep',
        'Mobilizing volunteers to cleanup streets, parks, and shared community spaces.',
        'Old Town District',
        '2024-04-27'
    ),
    (
        3,
        'Back-to-School Supply Drive',
        'Collecting and distributing school supplies for students who need extra support.',
        'Unity Community Hub',
        '2024-05-30'
    );