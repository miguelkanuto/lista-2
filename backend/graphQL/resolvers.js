import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Person from "../models/Person.js";
import Profile from "../models/Profile.js";
import Project from "../models/Project.js";
import Task from "../models/Task.js";

// const secret = process.env.JWT_SECRET;

const resolvers = {
  Query: {
    // User
    getAllUsers: async () => {
      return await User.find().select("-password");
    },

    // Person
    getAllPeople: async () => {
      return await Person.find().populate("profile");
    },

    // Profile
    getAllProfiles: async () => {
      return await Profile.find().populate("person");
    },

    // Project
    getAllProjects: async () => {
      return await Project.find().populate("tasks");
    },

    // Task
    getTasks: async () => {
      return await Task.find().populate("person").populate("projects");
    },
  },

  Mutation: {
    // Auth
    register: async (_, { email, password }) => {
      if (!email || !password)
        throw new Error("Email e senha são obrigatórios");

      const existingUser = await User.findOne({ email });
      if (existingUser) throw new Error("Email já cadastrado");

      const newUser = new User({ email, password });
      await newUser.save();
      return "Usuário registrado com sucesso";
    },

    login: async (_, { email, password }) => {
      if (!email || !password)
        throw new Error("Email e senha são obrigatórios");

      const user = await User.findOne({ email });
      if (!user) throw new Error("Usuário não encontrado");

      return new Promise((resolve, reject) => {
        user.isCorrectPassword(password, (err, same) => {
          if (err) reject(new Error("Erro ao verificar senha"));
          if (!same) reject(new Error("Senha incorreta"));

          const token = jwt.sign(
            { email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
          );

          resolve(token);
        });
      });
    },

    // User
    deleteUser: async (_, { id }) => {
      await User.findByIdAndDelete(id);
      return "Usuário deletado";
    },

    updateUser: async (_, { id, email, password }) => {
      const user = await User.findById(id);
      if (!user) throw new Error("Usuário não encontrado");

      if (email) user.email = email;
      if (password) user.password = password;

      await user.save(); // pre-hook re-hasheia a senha se foi alterada
      return "Usuário atualizado";
    },

    // Person
    createPerson: async (_, { name, age }) => {
      const newPerson = new Person({ name, age });
      return await newPerson.save();
    },

    deletePerson: async (_, { id }) => {
      await Person.findByIdAndDelete(id);
      return "Pessoa deletada";
    },

    updatePerson: async (_, { id, name, age }) => {
      return await Person.findByIdAndUpdate(id, { name, age }, { new: true });
    },

    // Profile
    createProfile: async (_, { occupation, phone, personId }) => {
      const newProfile = new Profile({ occupation, phone, person: personId });
      return await newProfile.save();
    },

    deleteProfile: async (_, { id }) => {
      await Profile.findByIdAndDelete(id);
      return "Profile deletado";
    },

    updateProfile: async (_, { id, occupation, phone }) => {
      return await Profile.findByIdAndUpdate(
        id,
        { occupation, phone },
        { new: true }
      );
    },

    // Project
    createProject: async (
      _,
      { name, description, startDate, endDate, taskIds }
    ) => {
      const newProject = new Project({
        name,
        description,
        startDate,
        endDate,
        tasks: taskIds,
      });
      const savedProject = await newProject.save();

      if (taskIds && taskIds.length > 0) {
        await Task.updateMany(
          { _id: { $in: taskIds } },
          { $push: { projects: savedProject._id } }
        );
      }

      return savedProject;
    },

    deleteProject: async (_, { id }) => {
      await Project.findByIdAndDelete(id);
      return "Projeto deletado";
    },

    updateProject: async (_, { id, name, description, startDate, endDate }) => {
      return await Project.findByIdAndUpdate(
        id,
        { name, description, startDate, endDate },
        { new: true }
      );
    },

    // Task
    createTask: async (_, { titulo, personId, projectIds }) => {
      const newTask = new Task({
        titulo,
        finished: false,
        person: personId,
        projects: projectIds,
      });
      const savedTask = await newTask.save();

      if (projectIds && projectIds.length > 0) {
        await Project.updateMany(
          { _id: { $in: projectIds } },
          { $push: { tasks: savedTask._id } }
        );
      }

      return savedTask;
    },

    deleteTask: async (_, { id }) => {
      await Task.findByIdAndDelete(id);
      return "Tarefa deletada";
    },

    updateTask: async (_, { id, titulo, finished }) => {
      return await Task.findByIdAndUpdate(
        id,
        { titulo, finished },
        { new: true }
      );
    },
  },
};

export default resolvers;
