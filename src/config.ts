export interface Certification {
    id: string;
    title: string;
    issuer: string;
    date: string;
    credentialUrl?: string;
    badgeImage?: string;
    description?: string;
}

export const config = {
    developer: {
        name: "Janver",
        fullName: "Janver Manlapaz",
        title: "Full Stack Developer | Big Data & Cloud Architecture",
        description: "Full Stack Developer specializing in front-end and back-end web application development. Focused on architecting scalable SaaS products and robust, data-driven systems."
    },
    social: {
        github: "janveryuu",
        email: "Janvermanlapaz@gmail.com",
        location: "Philippines"
    },
    about: {
        title: "About Me",
        description: "I am a Full Stack Software Engineer with 3+ years of experience designing and shipping scalable web applications end-to-end — from architecture through deployment. I specialize in building robust SaaS products and data-driven systems, with hands-on expertise across React, TypeScript, Node.js, and modern cloud infrastructure. Adept at applying strong RESTful API design and Object-Oriented Programming principles, I thrive on solving complex technical challenges to deliver seamless, high-performance user experiences from initial concept to final deployment."
    },
    experiences: [
        {
            position: "Full Stack Software Engineer (2nd Lead)",
            company: "Accenture",
            period: "May 2025 - June 2026",
            location: "CyberGate Boni Mandaluyong",
            description: "Served as 2nd Lead on a cross-functional development team shipping 30+ SaaS applications & interactive 3D websites for external clients. Developed front-end and back-end systems using React, Angular, Node.js, TypeScript, and WebGL across databases including MongoDB, MySQL, and PostgreSQL.",
            responsibilities: [
                "Served as 2nd Lead on a cross-functional development team shipping 30+ SaaS application products for external clients across varied industries",
                "Developed and maintained front-end and back-end systems using React, Angular, Node.js, TypeScript, JavaScript, and Tailwind CSS, alongside WebGL for 3D web experiences",
                "Designed and integrated RESTful APIs across client projects, applying strong OOP principles to ensure scalable, maintainable code",
                "Worked across a broad database and backend ecosystem including MongoDB, MySQL, PostgreSQL, Firebase, Java, and .NET",
                "Collaborated with team members and stakeholders in a fast-paced environment, taking on 2nd lead duties and AI automation workflows"
            ],
            technologies: ["React", "Angular", "Node.js", "TypeScript", "JavaScript", "WebGL", "MongoDB", "MySQL", "PostgreSQL", "Firebase", "Java", ".NET", "Tailwind CSS"]
        },
        {
            position: "Full Stack Developer",
            company: "Freelance",
            period: "January 2025 - January 2026",
            location: "Remote",
            description: "Developed and scaled end-to-end web applications for diverse clients, taking full ownership from design to deployment. Optimized complex PostgreSQL database queries reducing load times by 80%, built responsive front-ends with TypeScript & SASS, and managed AWS & Vercel cloud deployment pipelines.",
            responsibilities: [
                "Developed and scaled end-to-end web applications for diverse clients, taking full feature ownership from architectural design to production deployment",
                "Optimized legacy code and complex database queries using PostgreSQL and SQL, reducing application load times by 80% and query performance by 75%",
                "Integrated responsive front-end interfaces utilizing TypeScript, SASS, and HTML5, improving user engagement by 97.8%",
                "Managed cloud infrastructure and deployment pipelines on AWS and Vercel, ensuring 99.9% uptime and reducing deployment time by 55%",
                "Collaborated with stakeholders in a Linux-based environment to maintain codebases and deliver high-impact features 60% ahead of deadlines"
            ],
            technologies: ["TypeScript", "React", "PostgreSQL", "SQL", "SASS", "HTML5", "AWS", "Vercel", "Linux", "Git"]
        }
    ],
    projects: [
        {
            id: 1,
            title: "Pawi",
            category: "Full Stack / SaaS",
            technologies: "React, Next.js, TypeScript, Tailwind CSS, Prisma, PostgreSQL, Supabase",
            image: "/images/Pawi-logo.png",
            description: "Developed a comprehensive financial tracking application that empowers users to monitor income, expenses, and savings goals in real-time. Implemented a secure database architecture to manage sensitive user financial data and created an interactive dashboard using React and Tailwind CSS.",
            link: "https://pawi-finance.vercel.app/"
        },
        {
            id: 2,
            title: "Jujutsu",
            category: "Full Stack / SaaS & Fitness",
            technologies: "React, Next.js, TypeScript, Tailwind CSS, Prisma, Supabase, Vercel",
            image: "/images/jujutsu-logo.png",
            description: "Built a Jujutsu Kaisen anime-inspired SaaS fitness tracking application. Features interactive workout logs, exercise progress analytics, and custom training routines designed for high-performance fitness tracking.",
            link: "https://jujutsu-fitness.vercel.app/"
        },
        {
            id: 3,
            title: "Capy",
            category: "Full Stack / Lifestyle",
            technologies: "React, Next.js, TypeScript, Tailwind CSS, Prisma, Supabase, Vercel AI SDK",
            image: "/images/capy-logo.png",
            description: "Architected a dual-purpose lifestyle application combining daily emotional check-ins with collaborative travel planning. Designed intuitive, mobile-responsive interfaces and developed back-end APIs to securely sync user data, itineraries, and mood history across multiple devices.",
            link: "https://capy-app-fawn.vercel.app/"
        },
        {
            id: 4,
            title: "Unifind",
            category: "Full Stack / E-Commerce",
            technologies: "React, Node.js, Express, MongoDB, Tailwind CSS, Render",
            image: "/images/unifind-logo.png",
            description: "Built a centralized, campus-focused e-commerce platform facilitating the buying and selling of academic materials. Engineered a robust search and filtering system alongside an internal messaging API to enable seamless and secure communication between student buyers and sellers.",
            link: "https://unifind-1.onrender.com/"
        }
    ],
    contact: {
        email: "Janvermanlapaz@gmail.com",
        github: "https://github.com/janveryuu",
        linkedin: "https://www.linkedin.com/in/janver-manlapaz-1817aa419/?skipRedirect=true",
        twitter: "https://x.com/JanverManlapaz",
        facebook: "https://www.facebook.com/janverpmanlapaz.manlapaz",
        instagram: "https://www.instagram.com/zjanver.mz"
    },
    skills: {
        develop: {
            title: "FULL-STACK DEVELOPER",
            description: "Building scalable web applications & SaaS products",
            details: "Developing performant web applications with React, Next.js, and Node.js. Creating seamless user experiences and deploying scalable SaaS products with secure databases.",
            tools: ["React", "Next.js", "Node.js", "TypeScript", "MongoDB", "Tailwind CSS", "MySQL"]
        },
        design: {
            title: "BIG DATA & CLOUD",
            description: "Cloud architecture & data-driven system design",
            details: "Architecting scalable, data-driven systems using modern DevOps tooling. Experienced with database design, CI/CD pipelines, containerization, and cloud deployment workflows.",
            tools: ["Supabase", "Vercel", "AWS", "Google Cloud", "Hadoop", "Python"]
        }
    },
    certifications: [
        {
            id: "hennge-2026",
            title: "HENNGE Global Internship Program",
            issuer: "HENNGE K.K.",
            date: "2026",
            credentialUrl: "",
            description: "Passed the highly competitive admission challenge for HENNGE's global engineering internship, demonstrating proficiency in algorithms, data structures, and software engineering principles."
        },
        // TODO: replace with real cert data
        {
            id: "placeholder-1",
            title: "AWS Certified Developer – Associate",
            issuer: "Amazon Web Services",
            date: "2025",
            credentialUrl: "",
            description: "Validates technical expertise in developing, deploying, and debugging cloud-based applications using AWS services and architectures."
        },
        // TODO: replace with real cert data
        {
            id: "placeholder-2",
            title: "Google Cloud Professional Data Engineer",
            issuer: "Google Cloud",
            date: "2025",
            credentialUrl: "",
            description: "Demonstrates ability to design, build, operationalize, secure, and monitor data processing systems with a focus on big data and machine learning."
        }
    ] satisfies Certification[]
};



