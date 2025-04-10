import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>Информационный портал о вреде наркотиков</h1>
        <p className="subtitle">Образовательная платформа о последствиях употребления</p>
      </header>

      <main className="main-content">
        <section className="info-section">
          <h2>Почему это важно?</h2>
          <p>
            Наркотики представляют серьезную угрозу для физического и психического здоровья.
            Информированность о их вреде - первый шаг к предотвращению зависимости.
          </p>
        </section>

        <section className="facts-section">
          <h2>Факты о наркотиках</h2>
          <div className="fact-cards">
            <div className="fact-card">
              <h3>Физические последствия</h3>
              <p>Проблемы с сердцем, легкими, печенью и повреждение мозга.</p>
            </div>
            <div className="fact-card">
              <h3>Психологические последствия</h3>
              <p>Депрессия, тревожность, психозы и суицидальные мысли.</p>
            </div>
            <div className="fact-card">
              <h3>Социальные последствия</h3>
              <p>Разрушение отношений, потеря работы и финансовые проблемы.</p>
            </div>
          </div>
        </section>

        <section className="help-section">
          <h2>Где получить помощь</h2>
          <p>
            Если вы или ваши близкие страдают от зависимости, обратитесь за профессиональной помощью.
            Существуют специализированные центры, где окажут необходимую поддержку.
          </p>
          <button className="help-button">Получить консультацию</button>
        </section>
      </main>

      <footer className="footer">
        <p>© 2024 Информационный портал | Образовательный проект</p>
        <p>Данный ресурс содержит информацию исключительно в образовательных целях</p>
      </footer>
    </div>
  );
}

export default App;
