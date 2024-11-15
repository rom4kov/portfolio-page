PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE user (
	id INTEGER NOT NULL, 
	email VARCHAR(255) NOT NULL, 
	password VARCHAR(255) NOT NULL, 
	PRIMARY KEY (id), 
	UNIQUE (email)
);
CREATE TABLE text_content (
	id INTEGER NOT NULL, 
	body VARCHAR(1020) NOT NULL, 
	page VARCHAR(255) NOT NULL, 
	PRIMARY KEY (id)
);
INSERT INTO text_content VALUES(1,'<p><span style="font-family: Cantarell;">Hello. I''m Roman, a Fullstack Web Developer versed in React, Node.js, Python and Java. My ideal is to bring the creativity of Frontend Development together with the technical ingenuity of Backend Development.</span></p>','home');
INSERT INTO text_content VALUES(2,replace('<p><span style="font-family: Cantarell;">As a <span style="color: #ffffff;">Full Stack Web Developer</span> with over two years of experience, I specialize in building custom, fully responsive websites using a diverse range of technologies. My expertise spans from frontend frameworks like <span style="color: #02b5b2;">React</span>, <span style="color: #02b5b2;">GatsbyJS</span>, <span style="color: #02b5b2;">Tailwind</span> and&nbsp;<span style="color: #02b5b2;">Styled Components</span>, backend systems involving <span style="color: #02b5b2;">Node.js</span> and <span style="color: #02b5b2;">Firebase</span> and databases like <span style="color: #02b5b2;">MongoDB</span> and <span style="color: #02b5b2;">PostgreSQL</span>. I am passionate about creating clean, efficient code that prioritizes performance and user experience.</span></p>\n<p>&nbsp;</p>\n<p><span style="font-family: Cantarell;">Throughout my career, I''ve successfully delivered multiple projects, including custom content management systems and dynamic web applications. My continuous learning journey has equipped me with advanced skills in <span style="color: #02b5b2;">Python</span>, <span style="color: #02b5b2;">Flask</span>, <span style="color: #02b5b2;">TypeScript</span> and <span style="color: #02b5b2;">Java</span>, as well as a deep understanding of web development best practices. I am also well-versed in using tools like <span style="color: #02b5b2;">Git</span>, <span style="color: #02b5b2;">Linux</span>, and various testing frameworks to ensure robust and scalable applications.<br><br></span></p>\n<p><span style="font-family: Cantarell;">I am committed to staying at the forefront of technology, constantly refining my craft, and delivering impactful digital solutions.</span></p>','\n',char(10)),'about');
CREATE TABLE project_table (
	id INTEGER NOT NULL, 
	title VARCHAR(255) NOT NULL, 
	keywords JSON, 
	img_file_path VARCHAR(255), 
	description VARCHAR(255), url, 
	PRIMARY KEY (id), 
	UNIQUE (title), 
	UNIQUE (img_file_path), 
	UNIQUE (description)
);
INSERT INTO project_table VALUES(1,'WyldCamp - A Campground Review Site','["Node.js", "MongoDB", "JavaScript", "EJS", "Bootstrap", "Passport.js", "Mapbox", "Cloudinary"]','wyldcamp_compr.png','<p><em>WyldCamp</em> is a full-fledged campground review platform where users can immerse themselves in the outdoor community&mdash;digitally. The site enables users to register and create detailed profiles for campgrounds they''ve visited, sharing unique spots or hidden gems with others. Once a campground is created, it opens up for reviews from the community, inviting campers to share their own experiences, rate the site, and offer helpful tips.</p>','https://pure-sands-47730.herokuapp.com/');
INSERT INTO project_table VALUES(2,'psychotherapie-lukasbielefeld.de','["Node.js", "MongoDB", "JavaScript", "EJS", "Bootstrap", "Passport.js", "Mapbox", "Cloudinary", "SendGrid"]','bielefeld_compr.png','<p>The website&nbsp;<em>psychotherapie-lukasbielefeld.de</em> is a welcoming digital space for clients to learn about therapist Lukas Bielefeld&rsquo;s approach, view upcoming events, and access essential information. Built with Node.js, MongoDB, and EJS, it enables easy client interaction through SendGrid-powered contact forms, ensuring smooth and confidential communication.</p>','https://www.psychotherapie-lukasbielefeld.de');
INSERT INTO project_table VALUES(3,'Youknowmysteez - E-Commerce-Webapp','["React", "TypeScript", "Redux", "Redux Saga", "Firebase", "Stripe API", "Styled Components"]','ykms.png','<p><em>Youknowmysteez</em> is a dynamic E-Commerce platform dedicated to Hip Hop fashion. The site lets users sign up and explore a range of urban clothing, organized by categories for easy browsing. Built with React and TypeScript, the site harnesses Redux for efficient state management, while Firebase powers user authentication, profile management, and data storage&mdash;making <em>Youknowmysteez</em> as robust as it is stylish.</p>','https://jade-florentine-20f417.netlify.app/');
INSERT INTO project_table VALUES(4,'Psychotherapie Martin Brentrup','["React", "Context API", "Firebase", "Framer Motion", "Styled Components", "SendGrid", "Netlify"]','brentrup_compr.png','<p>The website&nbsp;<em>brentrup-psychotherapie.de</em> is a comprehensive resource for learning about psychotherapist Martin Brentrup&rsquo;s practice, approach, and expertise. Visitors can download selected publications as PDFs and reach out securely through a SendGrid-powered contact form. A custom, user-friendly admin panel allows for easy content updates, keeping the site accurate and engaging.</p>','https://brentrup-psychotherapie.de/');
INSERT INTO project_table VALUES(5,'Website for a Piano Teacher','["React", "GatsbyJS", "GraphQL", "Netlify Functions", "SendGrid"]','klavierunterricht_compr.png','<p>The website&nbsp;<em>klavierunterricht-pye.de</em> provides essential information about a piano teacher, including her teaching philosophy, pricing, and terms. With a simple, yet practical design, the site offers a stable user experience, built with GatsbyJS for fast performance. A contact form allows prospective students to easily get in touch for inquiries or bookings.</p>','https://klavierunterricht-pye.de/');
CREATE TABLE occupation (
	id INTEGER NOT NULL, 
	title VARCHAR(255) NOT NULL, 
	description VARCHAR(255), time_period TEXT, occupation_type TEXT, 
	PRIMARY KEY (id), 
	UNIQUE (title), 
	UNIQUE (description)
);
INSERT INTO occupation VALUES(3,'psychotherapie-lukasbielefeld.de',replace(replace('<p>Stack: HTML / CSS / Bootstrap / JS / Node / Express / MongoDB / EJS / Passport.js / Cloudinary / Mapbox / Webpack, Custom CMS</p>\r\n<ul>\r\n<li>Designed and implemented a custom, responsive web layout.</li>\r\n<li>Developed a Node.js and MongoDB-powered CMS with real-time, in-place content editing, eliminating the need for a traditional admin dashboard.</li>\r\n<li>Optimized site performance by integrating Webpack and backend performance tools, significantly reducing load times.</li>\r\n</ul>','\r',char(13)),'\n',char(10)),'05/2022 - 01/2023','work');
INSERT INTO occupation VALUES(4,'The Web Developer Bootcamp 2022 by Colt Steele','<p>Covered Topics: HTML / CSS / Bootstrap / JavaScript / DOM Manipulation / Node.js / Express.js / MongoDB / Mongoose / EJS / Passport.js / Schema Validation with joi / Cloudinary / Mapbox GL</p>','01/2022 - 05/2022','course');
INSERT INTO occupation VALUES(5,'Complete React Developer by A. Neagoie & Y. Zhang','<p>Covered Topics: Git &amp; GitHub / React Basics / Context API / Firebase / Redux / Redux Thunk / Redux Saga / Redux Toolkit / Stripe API / Typescript / Testing (Enzyme, Jest) / GraphQL / GatsbyJS / Webpack</p>','03/2023 - 10/2023','course');
INSERT INTO occupation VALUES(6,'100 Days of Code: The Complete Python Pro Bootcamp by Dr. Angela Yu','<p>Covered Topics: Python Basics: Lists, Logical Operators, Loops &amp; Dictionaries / Python Functions / OOP: Python Classes &amp; Subclasses / Tkinter / Flask &amp; Jinja / Python Decorators / SQLite / PostgreSQL / Data Science: Pandas, Matplotlib, Plotly, NumPy, scikit-learn &amp; Seaborn</p>','04/2024- 2024/08','course');
INSERT INTO occupation VALUES(9,'brentrup-psychotherapie.de',replace(replace('<p>Stack: React / Context API / Styled Components / Framer Motion / Firebase Auth / Firebase Firestore, Storage &amp; Cloud Functions / SendGrid</p>\r\n<ul>\r\n<li>Built a secure Firebase backend for authentication and content management,&nbsp;ensuring seamless handling of user and content data.</li>\r\n<li>Designed a custom admin panel and a unique, responsive web interface using&nbsp;React, enhancing both the user and admin experience.</li>\r\n<li>Fine-tuned data fetching algorithms for optimal performance, improving site&nbsp;efficiency and reducing load times.</li>\r\n</ul>','\r',char(13)),'\n',char(10)),'05/2023 - 12/2023','work');
INSERT INTO occupation VALUES(10,'klavierunterricht-pye.de',replace(replace('<p>Stack: HTML / CSS / GatsbyJS / GraphQL / Netlify Cloud Functions</p>\r\n<ul>\r\n<li>Developed a high-performance, SEO-friendly static personal website using<br>GatsbyJS, ensuring fast load times and improved search engine visibility.</li>\r\n<li>Implemented a contact form via Netlify cloud functions, providing seamless<br>backend communication and email functionality via SendGrid.</li>\r\n</ul>','\r',char(13)),'\n',char(10)),'04/2024 - 07/2024','work');
INSERT INTO occupation VALUES(11,'Java Programming I - MOOC University of Helsinki','<p>Covered Topics: Java Basics / Methods / Control Flow / Loops / Lists &amp; Arrays / File Handling / Classes / Object Oriented Programming / Primitive and reference variables / Error Handling / Data Structures &amp; Algorithms / Testing</p>','08/2024 - 09/2024','course');
INSERT INTO occupation VALUES(12,'Java Programming II - MOOC University of Helsinki','<p>Covered topics: HashMap / Class Inheritance / Object Polymorphism / Interfaces / Abstract Classes / Java Stream API / Lambda Expressions / Type Parameters / Generics / Data Visualization / JavaFX / Larger Programms</p>','09/2024 - 10/2024','course');
CREATE TABLE feature (
	id INTEGER NOT NULL, 
	title VARCHAR(255) NOT NULL, 
	img_file_path VARCHAR(255), 
	description VARCHAR(255), 
	project_id INTEGER NOT NULL, 
	PRIMARY KEY (id), 
	FOREIGN KEY(project_id) REFERENCES project_table (id)
);
INSERT INTO feature VALUES(1,'Keys to Connection: A Practical Piano Lesson Site','wyldcamp-6MgyZeyyYyFSrsFy1rcy5e.png','<p>The <em>klavierunterricht-pye.de</em> project presents a clean, user-friendly website for a piano teacher. An <strong>About</strong> page introduces visitors to the teacher&rsquo;s background, while <strong>Philosophy &amp; Pricing</strong> sections explain her teaching approach and session rates.</p>',1);
INSERT INTO feature VALUES(3,'','wyldcamp2-qtpocGQeVRTpCrrzWwhSew.png',replace(replace('<p dir="auto">Everyone can view campgrounds and reviews without signing up or logging in.</p>\r\n<p dir="auto">&nbsp;</p>','\r',char(13)),'\n',char(10)),1);
INSERT INTO feature VALUES(5,'Insight & Connection - psychotherapie-lukasbielefeld.de','bielefeld-h5uNLu6RhX9SmmJuCULgWn.png',replace(replace('<p>The website <em>psychotherapie-lukasbielefeld.de</em> provides a comprehensive look into Lukas Bielefeld&rsquo;s psychotherapy practice. Key features include a <strong>Current Events</strong> and a <strong>News</strong> section. The&nbsp;<strong>Therapy Approach</strong> page details his methodology, offering insights into therapeutic techniques and principles to help clients understand what to expect in sessions. A concise <strong>About Me</strong> section showcases Lukas&rsquo;s professional background. For easy communication, the website includes a&nbsp;<strong>Contact</strong> form powered by SendGrid, allowing secure and direct email outreach for appointment requests or inquiries.</p>\r\n<p>&nbsp;</p>','\r',char(13)),'\n',char(10)),2);
INSERT INTO feature VALUES(6,'In-place Content Management System (CMS)','bielefele_edit_text-rd6tavuF2CJfvtBDvoao8f.gif','<p>Once registered and logged in, users can edit page content directly in place. This allows for real-time updates without switching between an admin panel and the live page, making content management seamless and intuitive.</p>',2);
INSERT INTO feature VALUES(7,'Creating and Editing Campgrounds and Writing Reviews','','<p>To create and edit campgrounds or to write reviews for the campgrounds users will have to login. When creating a campground the location specified in the form will be shown in the map on page for this specific campground as well as on the big map showing all campgrounds.</p>',1);
INSERT INTO feature VALUES(8,'','wyldcamp3-6g572bz7cmoMVFkbSfF7ut.png','<p>A user can write reviews for every campground but only edit the campgrounds or delete the reviews that he / she created.</p>',1);
INSERT INTO feature VALUES(9,'','wyldcamp_create_review-tS1VE6vNYaauE9GuKFAiAd.gif','',1);
INSERT INTO feature VALUES(10,' Youknowmysteez - Webshop for Hip Hop fashion','ykms-fD1yja97mzbbf7CzQ22FPs.png','<p>In my Web Development course ''Complete React Developer'' by A. Neagoie and Y. Zhang, <em>Youknowmysteez</em> emerged as a dynamic E-Commerce platform dedicated to Hip Hop fashion, blending creativity with cutting-edge tech.</p>',3);
INSERT INTO feature VALUES(11,'','screenshot_2024-11-12-235234-cRNvTQxd5xkupMf6jDxFsz.png','<p>The site lets users sign up and explore a range of urban clothing, organized by categories for easy browsing. With a click, items can be added to a digital shopping basket, where customers can review selections before heading to the checkout page, which calculates the total cost.</p>',3);
INSERT INTO feature VALUES(12,'','ykms-2TX8XicU8kyRL3JYy7bdcJ.gif','<p>Going to the checkout page, the user can change the amount of each item in the shopping cart or remove it altogether. The total of each item and the cart in overall are immediatly reflected on the page.</p>',3);
INSERT INTO feature VALUES(13,'','ykms_checkout-4sL9gGKUHN9HogwABmgRQG.gif','<p>The checkout area offers customers a streamlined experience with multiple payment options, allowing them to securely choose their preferred method for completing the purchase.</p>',3);
INSERT INTO feature VALUES(14,'Building Connection: A Digital Space for Psychotherapy','brentrup-3u3zJpNbcjMU4tyDcsfYYX.png',replace(replace('<p>The&nbsp;<em>brentrup-psychotherapie.de</em>&nbsp;project showcases a thoughtfully designed website for a psychotherapy practice. Visitors can explore an&nbsp;<strong>About Me</strong>&nbsp;section detailing Brentrup&rsquo;s background, a&nbsp;<strong>Guiding Ideas</strong>&nbsp;page that outlines his therapeutic philosophy, and a&nbsp;<strong>Services</strong>&nbsp;section listing core offerings. Additionally, the&nbsp;<strong>PDF Materials</strong>&nbsp;page provides access to downloadable publications, while the&nbsp;<strong>Contact</strong> section enables secure inquiries, ensuring a welcoming and informative online experience.</p>\r\n<p>&nbsp;</p>','\r',char(13)),'\n',char(10)),4);
INSERT INTO feature VALUES(15,'Effortless Content Management: Intuitive Admin Panel','','<p>The admin panel for&nbsp;<em>brentrup-psychotherapie.de</em> features a user-friendly interface that simplifies content management for the practice. A structured navigation sidebar provides easy access to each section and media type, with dedicated edit areas for every part of the website. This organized layout allows for quick updates across pages, ensuring seamless, efficient management of content and media.</p>',4);
INSERT INTO feature VALUES(16,'','brentrup-cms-sgoQmZn3jwn66gKw3HwjhP.gif','<p>Each media type and element in the admin panel is displayed with a clear preview, showing both the existing media from the database and the newly selected file. This allows administrators to easily compare and decide whether to upload the new data.</p>',4);
INSERT INTO feature VALUES(17,'','brentrup-cms-img-cuU7CbakQtH8j13mwVe3b5.gif','<p>The account management section of the admin panel offers an intuitive interface for updating account details. Users can easily change their username, email address, and password, or choose to delete their account entirely.&nbsp;</p>',4);
INSERT INTO feature VALUES(18,'','account_compr-6h8rsxZdw9avGZvhWvN948.png','',4);
INSERT INTO feature VALUES(19,'Keys to Connection: A Simple and Informative Piano Lesson Site','screenshot_2024-11-14-194642-tc2C94bhNNSs8iS3edtnGa.png','<p>The <em>klavierunterricht-pye.de</em> project presents a clean, user-friendly website for a piano teacher. An <strong>About</strong> page introduces visitors to the teacher&rsquo;s background, while <strong>Philosophy &amp; Pricing</strong> sections explain her teaching approach and session rates.</p>',5);
INSERT INTO feature VALUES(20,'','klavier_mail-3PYmU1PEkPtpuiw32WPmxE.gif','<p>The site features a straightforward <strong>Contact Form</strong> with instant feedback upon sending, ensuring easy communication, and includes a handy <strong>Map</strong> for directions to the teaching location, making it simple for prospective students to connect and plan their visit.</p>',5);
CREATE TABLE course (
	id INTEGER NOT NULL, 
	time_period VARCHAR(255) NOT NULL, 
	title VARCHAR(255) NOT NULL, 
	description VARCHAR(255), 
	PRIMARY KEY (id), 
	UNIQUE (title), 
	UNIQUE (description)
);
COMMIT;
