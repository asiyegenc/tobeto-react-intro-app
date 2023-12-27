import React, { useState, useEffect } from "react";
import { Dropdown } from "semantic-ui-react";
import "./Todo.css";

function Todo() {
  // İlk olarak useState hook kullanarak bileşen içinde kullanılacak stateler tanımlanır
  const [todos, setTodos] = useState([]);
  // Kullanıcının girdiği görev metni => useState([sinema etkinliği])
  const [text, setText] = useState("");
  // Kullanıcının seçtiği tamamlanma günü => useState("tmorrow")
  const [completionday, setCompletionday] = useState("");
  // Tamamlanma günü seçenekleri => useState("today, tmorrow or other days")
  const [dropdownOptions] = useState([
    { key: "today", text: "Today", value: "Today" },
    { key: "tomorrow", text: "Tomorrow", value: "Tomorrow" },
  // Dropdown => Açılır menü veya açılır liste oluşturur. Bir veya birkaç öğe seçilebilir.
  // key:id, text:kullanıcnın listeden seçtiği metin, value:seçilen ifadenin döndürdüğü değer
  ]);

  const handleAddTodo = () => {
    // Kullanıcının girdiği görev metni boş değilse devam eder
    if (text.trim() !== "") { // Kullanıcının girdiği metni kontrol eder
      const newTodo = { //Eğer girdi boş değilse, yeni bir görev objesi oluşturur
        id: Date.now(),
        text: text,
        completionday: completionday || "Today",
      };
      // Yeni görevi(newTodo) ekleyerek görev listesini günceller
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setText(""); // set => kullanıcının veri girdiği alanını temizler.
      setCompletionday("");
    }
  };

  // Görevi silmek için işlev
  const handleDeleteTodo = (id) => {
    // Görevi filtreleyerek siler
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  // Eğer görev listesi boşsa tamamlanma gününü sıfırlar
  useEffect(() => {
    if (todos.length === 0) {
      setCompletionday("");
    }
  }, [todos]);

  // Görevleri tamamlanma gününe göre gruplayan nesne
  const groupedTodos = todos.reduce((acc, todo) => {
    // Her bir görevin tamamlanma günü
    const day = todo.completionday;
    // Eğer acc nesnesinde day adında bir özellik yoksa, bu özelliği oluşturur
    if (!acc[day]) {
      acc[day] = [];
    }
    // Görevi ilgili günün listesine ekler
    acc[day].push(todo);
    return acc;
  }, {});

  // JSX olarak Todo bileşeni kullanımı
  return (
    <div>
      <h1 className="todo-title">Daily Task App</h1>
      {/* Görev eklemek için form oluşturur */}
      <form
        onSubmit={(e) => {
          // sayfanın yeniden yüklenmesini engeller
          e.preventDefault();
          // handleAddTodo işlemini çağır
          handleAddTodo();
        }}
      >
        {/* Görev metni için input */}
        <input
          type="text"
          className="task"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add New Task"
        />
        {/* Tamamlanma günü seçimi için Dropdown */}
        <Dropdown
          placeholder="Select Completion Day"
          fluid
          selection
          options={dropdownOptions}
          onChange={(e, { value }) => setCompletionday(value)}
        />
        {/* Görev ekleme butonu oluşturur */}
        <button className="ui positive button" type="submit">
          Add
        </button>
      </form>
      {/* Görevleri tarihe göre gruplandırıp gösterir */}
      <div>
        {Object.entries(groupedTodos).map(([day, dayTodos]) => (
          <div key={day}>
            <h2>{day}</h2>
            {dayTodos.map((todo) => (
              <div className="todo" key={todo.id}>
                {/* Görev metni için input */}
                <span className="ui input">
                  <input type="text" placeholder={todo.text} />
                </span>
                {/* Tamamlanma günü için input */}
                <span className="ui input">
                  <input type="text" placeholder={todo.completionday} />
                </span>
                {/* Görevi silme butonu oluşturur */}
                <button
                  className="ui negative button"
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
export default Todo;