const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const vapidKeys = {
  publicKey:
    "BH3IgVRDYdHAN4EfeblPFYs9_ZXV0Ae9pL8bMZ6Gvu-Bf9BW5NvQB8rO93xensr9jwkYBPexwROAYXdmvOp7iCE",
  privateKey: "RqsAYYyITJy0s51FrK0D383DJoGDnNWR4ZLutKkQCHY",
};

webpush.setVapidDetails(
  "mailto:valdemarcheck@yandex.ru",
  vapidKeys.publicKey,
  vapidKeys.privateKey,
);

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "./"))); // если server.js в корне

// Хранилище подписок
let subscriptions = [];

const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

io.on("connection", (socket) => {
  console.log("Клиент подключён:", socket.id);

  // Обработка события 'newTask' от клиента
  socket.on("newTask", (task) => {
    // Рассылаем событие всем подключённым клиентам, включая отправителя
    io.emit("taskAdded", task);

    // Формируем payload для push-уведомления
    const payload = JSON.stringify({
      title: "Новая задача",
      body: task.text,
    });

    // Отправляем уведомление всем подписанным клиентам
    subscriptions.forEach((sub) => {
      webpush
        .sendNotification(sub, payload)
        .catch((err) => console.error("Push error:", err));
    });
  });

  socket.on("disconnect", () => {
    console.log("Клиент отключён:", socket.id);
  });
});

// Эндпоинты для управления push-подписками
app.post("/subscribe", (req, res) => {
  subscriptions.push(req.body);
  res.status(201).json({ message: "Подписка сохранена" });
});

app.post("/unsubscribe", (req, res) => {
  const { endpoint } = req.body;
  subscriptions = subscriptions.filter((sub) => sub.endpoint !== endpoint);
  res.status(200).json({ message: "Подписка удалена" });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
