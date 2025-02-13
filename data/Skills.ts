
export interface Skill {
  name: string;
  proficiency: number;
  experience: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface SkillCategories {
  Frontend: Skill[];
  Backend: Skill[];
  MachineLearning: Skill[];
  Languages: Skill[];
}

export const skills: SkillCategories = {
  Frontend: [
    { name: "HTML", proficiency: 95, experience: "Expert" },
    { name: "CSS", proficiency: 80, experience: "Advanced" },
    { name: "React.js", proficiency: 90, experience: "Expert" },
    { name: "Next.js", proficiency: 75, experience: "Intermediate" },
    { name: "Tailwind CSS", proficiency: 80, experience: "Expert" }
  ],
  Backend: [
    { name: "Node.js", proficiency: 89, experience: "Advanced" },
    { name: "Express.js", proficiency: 87, experience: "Advanced" },
    { name: "Flask", proficiency: 50, experience: "Beginner" },
    { name: "MongoDB", proficiency: 80, experience: "Advanced" },
    { name: "PostgreSQL", proficiency: 78, experience: "Intermediate" },
    { name: "Prisma", proficiency: 75, experience: "Intermediate" }
  ],
  MachineLearning: [
    { name: "TensorFlow", proficiency: 55, experience: "Beginner" },
    { name: "PyTorch", proficiency: 55, experience: "Beginner" },
    { name: "Scikit-learn", proficiency: 75, experience: "Intermediate" },
    { name: "Neural Networks", proficiency: 75, experience: "Intermediate" }
  ],
  Languages: [
    { name: "Java", proficiency: 85, experience: "Advanced" },
    { name: "Python", proficiency: 85, experience: "Advanced" },
    { name: "JavaScript", proficiency: 80, experience: "Advanced" },
    { name: "TypeScript", proficiency: 75, experience: "Intermediate" },
    { name: "C", proficiency: 95, experience: "Expert" }
  ]
};