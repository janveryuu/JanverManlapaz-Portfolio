export interface Certification {
    id: string;
    title: string;
    issuer: string;
    date: string;
    credentialUrl?: string;
    badgeImage?: string;
    image?: string;
    description?: string;
    skills?: string[];
}

export const config = {
    developer: {
        name: "Janver",
        fullName: "Janver Manlapaz",
        title: "Full Stack Developer | AI Engineer",
        description: "Full Stack Developer and AI Engineer specializing in building scalable web applications, intelligent products, and integrating LLM-driven features end-to-end."
    },
    social: {
        github: "janveryuu",
        email: "Janvermanlapaz@gmail.com",
        location: "Philippines"
    },
    about: {
        title: "About Me",
        description: "I am a Full Stack Software Engineer and AI Engineer with 3+ years of experience designing and shipping scalable web applications and intelligent systems end-to-end — from architecture through deployment. I specialize in building robust SaaS products and AI-powered workflows, with hands-on expertise across React, TypeScript, Node.js, and modern LLM integrations. Adept at applying strong RESTful API design and Object-Oriented Programming principles, I thrive on solving complex technical challenges to deliver seamless, high-performance user experiences from initial concept to final deployment."
    },
    experiences: [
        {
            position: "Full Stack Developer Intern",
            company: "Certicode",
            period: "July 2026 - Present",
            location: "Remote",
            description: "Contributing to Vetmates — a large-scale, full-stack platform redefining veterinary care for pet owners across the Philippines. Building and integrating core features across the web application and mobile app, including verified vet booking, digital medical record tracking, and a trusted pet community hub — delivering seamless, compassionate experiences for every pet and their owner.",
            responsibilities: [
                "Developing full-stack features for the Vetmates platform — a comprehensive veterinary care ecosystem covering web, mobile, and community experiences",
                "Building responsive, user-friendly interfaces with React and TypeScript, ensuring accessibility and performance across all devices",
                "Collaborating with a cross-functional team on backend API design and database architecture to support real-time vet booking and pet health record management",
                "Contributing to mobile application development and end-to-end feature delivery from design handoff to production deployment",
                "Participating in agile sprint planning, code reviews, and team-wide engineering discussions to continuously improve product quality"
            ],
            technologies: ["React", "TypeScript", "Node.js", "Mobile Development", "REST APIs", "PostgreSQL", "Git", "Agile"]
        },
        {
            position: "AI Engineer",
            company: "Freelance",
            period: "June 2025 - Present",
            location: "Remote",
            description: "Architecting and deploying production-grade AI systems and LLM-powered applications for diverse clients end-to-end. Engineered real-time conversational AI agents using Groq and LLaMA 3, built intelligent automation pipelines with advanced prompt engineering, and integrated AI-driven features into full-stack web products — reducing manual workloads by up to 70% and delivering measurably smarter user experiences.",
            responsibilities: [
                "Designed and deployed intelligent LLM-powered applications using Groq, LLaMA 3, and Gemini APIs, delivering sub-200ms inference response times in production",
                "Built end-to-end AI automation pipelines and agentic workflows, reducing client manual workloads by up to 70%",
                "Engineered advanced prompt systems and context-aware retrieval architectures to maximize model accuracy and relevance",
                "Integrated AI-driven features seamlessly into full-stack web products using React, Next.js, and Node.js with Vercel serverless infrastructure",
                "Delivered AI-powered tools across SaaS, productivity, and lifestyle verticals — from conversational chatbots to intelligent data processing systems"
            ],
            technologies: ["Groq", "LLaMA 3", "Gemini", "Python", "LLM Integration", "Prompt Engineering", "React", "Node.js", "Vercel", "TypeScript"]
        },
        {
            position: "Full Stack Developer",
            company: "Freelance",
            period: "January 2025 - Present",
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
        },
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
            title: "Dormosaur",
            category: "Full Stack / SaaS & AI",
            technologies: "Next.js, TypeScript, Supabase, Groq, Gemini AI, Framer Motion, Tailwind CSS, Vercel",
            image: "/images/dormosaur-logo.png",
            description: "Architected and shipped Dormosaur — a full-stack AI-powered SaaS platform built for dorm life. Students paste their raw, messy class schedules and the app uses Gemini AI to instantly generate a clean, beautiful timetable with auto-synced alarms for every class. Features a Kitchen module with AI-suggested dorm-friendly recipes, a Deadline tracker, an Admin dashboard, push notification cron jobs, and full authentication — all built on Next.js 16, Supabase, and deployed on Vercel.",
            link: "https://github.com/janveryuu/dormosaur"
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
            title: "AI ENGINEER",
            description: "Applied AI systems & intelligent product integration",
            details: "Engineering hands-on AI features and production-ready intelligent workflows. Experienced in integrating high-performance LLM APIs, building automated AI pipelines, prompt engineering, and deploying AI-assisted web applications end-to-end.",
            tools: ["Groq", "LLaMA 3", "Gemini", "LLM Integration", "Prompt Engineering", "Python"]
        }
    },
    certifications: [
        {
            id: "accenture-academy-2025",
            title: "Accenture Technology Academy",
            issuer: "Accenture",
            date: "2025 – 2026",
            image: "/images/certificates/accenture-academy.webp",
            credentialUrl: "/images/certificates/accenture-academy.webp",
            description: "Certificate of Completion for successfully completing the Accenture Technology Academy training program in Back End and Front End Development.",
            skills: ["Full Stack", "Front End", "Back End", "Enterprise Architecture"]
        },
        {
            id: "udemy-bootcamp-2026",
            title: "The Complete Full-Stack Web Development Bootcamp",
            issuer: "Udemy • Dr. Angela Yu",
            date: "July 2026",
            image: "/images/certificates/udemy-bootcamp.webp",
            credentialUrl: "/images/certificates/udemy-bootcamp.webp",
            description: "176-hour comprehensive full-stack engineering bootcamp covering modern web architectures, React, Node.js, databases, REST APIs, and production deployment.",
            skills: ["Full Stack", "React", "Node.js", "PostgreSQL", "REST APIs"]
        },
        {
            id: "circuit-java-2025",
            title: "Java Trial Session – CIRCUIT",
            issuer: "CURSOR • Batangas State University",
            date: "Nov 2025",
            image: "/images/certificates/java-certificate.webp",
            credentialUrl: "/images/certificates/java-certificate.webp",
            description: "Certificate of Recognition for active participation and proficiency in the Java Trial Session of the CURSOR Initiative for Robotics, Coding, Uptraining, Innovation, & Talent.",
            skills: ["Java", "OOP", "Algorithms", "Software Engineering"]
        },
        {
            id: "circuit-python-2025",
            title: "2nd Python Trial Session – CIRCUIT",
            issuer: "CURSOR • Batangas State University",
            date: "Nov 2025",
            image: "/images/certificates/python-certificate.webp",
            credentialUrl: "/images/certificates/python-certificate.webp",
            description: "Certificate of Recognition for active participation and performance in the 2nd Python Trial Session of the CURSOR Initiative for Robotics, Coding, Uptraining, Innovation, & Talent.",
            skills: ["Python", "Data Structures", "Scripting", "Automation"]
        },
        {
            id: "circuit-robotics-2025",
            title: "Robotics Trial Session – CIRCUIT",
            issuer: "CURSOR • Batangas State University",
            date: "Nov 2025",
            image: "/images/certificates/robotics-certificate.webp",
            credentialUrl: "/images/certificates/robotics-certificate.webp",
            description: "Certificate of Recognition for active participation in the Robotics Trial Session organized by the Computer Engineering Students' Organization.",
            skills: ["Robotics", "Hardware-Software Integration", "Microcontrollers"]
        }
    ] satisfies Certification[]
};



