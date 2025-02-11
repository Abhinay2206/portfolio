
export interface Skill {
  name: string;
  proficiency: number;
  experience: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface SkillCategories {
  Frontend: Skill[];
  Backend: Skill[];
  MachineLearning: Skill[];
}

export const skills: SkillCategories = {
  Frontend: [
    { name: "React", proficiency: 90, experience: "Expert" },
    { name: "Next.js", proficiency: 75, experience: "Intermediate" },
    { name: "JavaScript", proficiency: 95, experience: "Expert" },
    { name: "TypeScript", proficiency: 75, experience: "Intermediate" },
    { name: "Tailwind CSS", proficiency: 80, experience: "Expert" }
  ],
  Backend: [
    { name: "Node.js", proficiency: 89, experience: "Advanced" },
    { name: "Express", proficiency: 87, experience: "Advanced" },
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
  ]
};