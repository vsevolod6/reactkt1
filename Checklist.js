import React, { useState } from 'react';
import './Checklist.css';

const Checklist = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  // Добавление новой задачи
  const addTask = () => {
    if (newTask.trim() !== '') {
      const newTaskObj = {
        id: Date.now(),
        text: newTask.trim(),
        completed: false
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask('');
    }
  };

  // Удаление задачи
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Переключение статуса выполнения
  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Начало редактирования
  const startEditing = (task) => {
    setEditingId(task.id);
    setEditingText(task.text);
  };

  // Сохранение редактирования
  const saveEditing = (id) => {
    if (editingText.trim() !== '') {
      setTasks(tasks.map(task =>
        task.id === id ? { ...task, text: editingText.trim() } : task
      ));
    }
    setEditingId(null);
    setEditingText('');
  };

  // Отмена редактирования
  const cancelEditing = () => {
    setEditingId(null);
    setEditingText('');
  };

  // Обработка нажатия Enter при добавлении задачи
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className="checklist">
      <h1>Мой Чеклист</h1>
      
      {/* Форма добавления новой задачи */}
      <div className="add-task">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Добавьте новую задачу..."
          className="task-input"
        />
        <button onClick={addTask} className="add-button">
          Добавить
        </button>
      </div>

      {/* Список задач */}
      <div className="tasks-list">
        {tasks.length === 0 ? (
          <p className="empty-message">Задач пока нет. Добавьте первую!</p>
        ) : (
          tasks.map(task => (
            <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
              {/* Чекбокс выполнения */}
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
                className="checkbox"
              />

              {/* Текст задачи или поле редактирования */}
              {editingId === task.id ? (
                <div className="editing-container">
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && saveEditing(task.id)}
                    className="edit-input"
                    autoFocus
                  />
                  <div className="edit-buttons">
                    <button 
                      onClick={() => saveEditing(task.id)} 
                      className="save-button"
                    >
                      ✓
                    </button>
                    <button 
                      onClick={cancelEditing} 
                      className="cancel-button"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ) : (
                <div className="task-content">
                  <span 
                    className="task-text"
                    onDoubleClick={() => startEditing(task)}
                  >
                    {task.text}
                  </span>
                  <div className="task-actions">
                    <button 
                      onClick={() => startEditing(task)} 
                      className="edit-button"
                      title="Редактировать"
                    >
                      ✏️
                    </button>
                    <button 
                      onClick={() => deleteTask(task.id)} 
                      className="delete-button"
                      title="Удалить"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Статистика */}
      {tasks.length > 0 && (
        <div className="stats">
          Всего задач: {tasks.length} | 
          Выполнено: {tasks.filter(task => task.completed).length} | 
          Осталось: {tasks.filter(task => !task.completed).length}
        </div>
      )}
    </div>
  );
};

export default Checklist;
