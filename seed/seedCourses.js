import 'dotenv/config';
// import connectDB from '../config/db.js';
import courseModel from '../models/courseModel.js';

const courses = [
    { title: 'React from Scratch', description: 'Beginner to advanced React', price: 0, image: 'https://cdn-ak.f.st-hatena.com/images/fotolife/d/dev04K/20230716/20230716083503.jpg' },
    { title: 'Node.js Masterclass', description: 'Backend with Node and Express', price: 499, image: 'https://tse2.mm.bing.net/th/id/OIP.73_psqIMeL-iN_jj64360wHaD_?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3' },
    { title: 'MongoDB for Developers', description: 'Master NoSQL', price: 299, image: 'https://th.bing.com/th/id/OIP.0JmVSDGo5ML7oW2fOHuLIgHaD8?w=332&h=180&c=7&r=0&o=7&cb=ucfimg2&dpr=1.3&pid=1.7&rm=3&ucfimg=1' },
    { title: 'Algorithms in JS', description: 'Data structures & algorithms', price: 199, image: 'https://i.ytimg.com/vi/Qmt0QwzEmh0/maxresdefault.jpg' },
    { title: 'Docker Essentials', description: 'Containerization for devs', price: 260, image: 'https://www.devopsschool.com/blog/wp-content/uploads/2020/06/d.png' },
    { title: 'C Programming', description: 'Beginner to advanced C programming', price: 0, image: 'https://tse3.mm.bing.net/th/id/OIP.9PuN3xx84IgtbFpVqdSTgAHaEK?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3' },
    { title: 'C# Mastery', description: 'C# industry based full', price: 399, image: 'https://www.tatvasoft.com/outsourcing/wp-content/uploads/2023/01/C.NET1_.jpg' },
    { title: 'C++ for Developers', description: 'C++ advanced', price: 699, image: 'https://tse3.mm.bing.net/th/id/OIP.TyrZyk3XH8dsZlrG0PwFbgAAAA?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3' },
    { title: 'Golang', description: 'Full Course', price: 199, image: 'https://tse2.mm.bing.net/th/id/OIP.icy-2DtUJMwhDV4fHTahSgHaEK?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3' },
    { title: 'MERN full Course', description: 'Full stack developer', price: 999, image: 'https://tse4.mm.bing.net/th/id/OIP.BywBvGYniJe2YUeKHcs_sQHaEP?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3' }
];

async function seed() {
    try {
        // await connectDB();

        await courseModel.deleteMany({});
        await courseModel.insertMany(courses);

        console.log("Courses seeded successfully");
        process.exit(0);
    } 
    catch (error) {
        console.error("Error seeding courses:", error);
        process.exit(1);
    }
}

seed();
