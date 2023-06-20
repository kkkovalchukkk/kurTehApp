const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Парсинг JSON-данных
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Подключение к MongoDB
mongoose
  .connect("mongodb://localhost:27017/myapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Успешное подключение к базе данных");
  })
  .catch((err) => {
    console.error("Ошибка подключения к базе данных:", err);
  });

const respondentSchema = new mongoose.Schema({
  studentId: String,
  fullName: String,
  email: String,
  phoneNumber: String,
  about: String,
});

const applicationSchema = new mongoose.Schema({
  title: String,
  text: String,
  createdBy: String,
  createdById: String,
  createdAt: {type: Date, default: Date.now},
  tags: [String], // Массив тегов
  responded: [respondentSchema], // Массив тегов
});

// Создание схемы для юзера
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  login: {
    type: String,
    requires: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

const Application = mongoose.model("Application", applicationSchema);

app.post("/applications/:id/respond", (req, res) => {
  const {id} = req.params; // Идентификатор заявки
  const {fullName, email, phoneNumber, about, studentId} = req.body; // Информация о студенте

  const respondent = {studentId, fullName, email, phoneNumber, about};

  Application.findByIdAndUpdate(id, {$push: {responded: respondent}}, {new: true})
    .then((updatedApplication) => {
      if (!updatedApplication) {
        return res.status(404).json({error: "Заявка не найдена"});
      }
      res.json(updatedApplication);
    })
    .catch((error) => {
      console.error("Ошибка при обновлении заявки:", error);
      res.status(500).json({error: "Внутренняя ошибка сервера"});
    });
});

app.post("/applications", (req, res) => {
  const {title, text, createdBy, createdById, tags} = req.body;

  // Создание новой заявки
  const newApplication = new Application({
    title: title,
    text: text,
    createdBy: createdBy,
    createdById: createdById,
    tags: tags,
    responded: [],
  });

  // Сохранение заявки в базе данных
  newApplication
    .save()
    .then(() => {
      res.status(200).json({message: "Заявка успешно создана"});
    })
    .catch((error) => {
      res.status(500).json({error: "Ошибка при сохранении заявки"});
    });
});

app.get("/applications", (req, res) => {
  Application.find()
    .then((applications) => {
      res.status(200).json(applications);
    })
    .catch((error) => {
      res.status(500).json({error: "Ошибка при получении заявок"});
    });
});

app.get("/applications/:id", (req, res) => {
  const userId = req.params.id;
  Application.find({createdById: userId})
    .then((applications) => {
      res.status(200).json(applications);
    })
    .catch((error) => {
      res.status(500).json({error: "Ошибка при получении заявок"});
    });
});

app.get("/applications/r/:id", (req, res) => {
  const id = req.params.id;
  Application.find({_id: id}, {responded: 1, _id: 0}) // Указываем только поле responded и исключаем поле _id
    .then((applications) => {
      if (applications.length === 0) {
        return res.status(404).json({error: "Заявка не найдена"});
      }
      const respondedArray = applications[0].responded.map((respondedItem) => respondedItem.toObject());
      res.status(200).json(respondedArray); // Возвращаем прямо массив responded
    })
    .catch((error) => {
      res.status(500).json({error: "Ошибка при получении заявок"});
    });
});

app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  User.findByIdAndDelete(userId)
    .then(() => {
      res.status(200).json({message: "Юзер успешно удалена"});
    })
    .catch((error) => {
      res.status(500).json({error: "Ошибка при удалении юзера"});
    });
});

app.delete("/applications/:id", (req, res) => {
  const applicationId = req.params.id;
  Application.findByIdAndDelete(applicationId)
    .then(() => {
      res.status(200).json({message: "Заявка успешно удалена"});
    })
    .catch((error) => {
      res.status(500).json({error: "Ошибка при удалении заявки"});
    });
});

// Путь для регистрации юзера
app.post("/register", async (req, res) => {
  try {
    const {name, login, email, password, role} = req.body;
    const student = new User({name, login, email, password, role});

    const existingUser = await User.findOne({login, email});

    if (existingUser) {
      return res.status(400).json({error: "Пользователь с таким логином или электронной почтой уже существует"});
    }
    await student.save();

    const user = student.toObject();
    console.log(user);
    res.status(200).json({message: "Пользователь успешно зарегистрирован", user});
  } catch (err) {
    console.log(err);
    res.status(500).json({error: "Что-то пошло не так"});
  }
});

app.post("/login", async (req, res) => {
  try {
    const {login, password} = req.body;
    const user = await User.findOne({login, password});
    if (user) {
      res.status(200).json({message: "Вход выполнен успешно", name: user.name, role: user.role, user});
    } else {
      res.status(401).json({error: "Неверный логин или пароль"});
    }
  } catch (error) {
    res.status(500).json({error: "Что-то пошло не так"});
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({error: "Что-то пошло не так"});
  }
});

// Удалить всех юзеров

// User.deleteMany({}).then(() => {
//   console.log("Успешно");
// });

app.listen(3000, () => {
  console.log("Сервер запущен на порту 3000");
});
