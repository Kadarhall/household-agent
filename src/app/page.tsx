const week = [
  { day: "Sun", date: "27" },
  { day: "Mon", date: "28" },
  { day: "Tue", date: "29" },
  { day: "Wed", date: "30", today: true },
  { day: "Thu", date: "01" },
  { day: "Fri", date: "02" },
  { day: "Sat", date: "03" },
];

const events = [
  {
    time: "8:30 AM",
    title: "School drop-off",
    detail: "Maplewood Elementary · 8:30–9:00",
    person: "M",
    color: "",
  },
  {
    time: "3:15 PM",
    title: "Soccer practice",
    detail: "Riverside Park · 3:15–4:30",
    person: "J",
    color: "gold",
  },
  {
    time: "5:00 PM",
    title: "Pick up groceries",
    detail: "Market Street · before dinner",
    person: "A",
    color: "coral",
  },
  {
    time: "6:30 PM",
    title: "Dinner with Nana",
    detail: "At home · bring the photo album",
    person: "M",
    color: "",
  },
];

export default function Home() {
  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Main navigation">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">h</span>
          hearth
        </div>
        <p className="nav-label">Workspace</p>
        <a className="nav-link active" href="#today"><span className="nav-icon">⌂</span>Today</a>
        <a className="nav-link" href="#calendar"><span className="nav-icon">▦</span>Calendar</a>
        <a className="nav-link" href="#people"><span className="nav-icon">♧</span>People</a>
        <a className="nav-link" href="#settings"><span className="nav-icon">⚙</span>Settings</a>

        <div className="sidebar-bottom">
          <div className="household-card">
            <div className="avatars" aria-label="Three household members">
              <span className="avatar">A</span>
              <span className="avatar">M</span>
              <span className="avatar">J</span>
            </div>
            <strong>Sample household</strong>
            <span>3 family members</span>
          </div>
          <div className="sidebar-profile">
            <span className="avatar">A</span>
            <div><strong>Alex (sample)</strong><span>Household admin</span></div>
          </div>
        </div>
      </aside>

      <main className="main" id="today">
        <header className="topbar">
          <div>
            <p className="eyebrow">Dashboard preview · sample schedule</p>
            <h1>Good morning, Alex <span aria-hidden="true">☀</span></h1>
          </div>
          <div className="top-actions">
            <button className="icon-button" type="button" aria-label="Notifications">♧</button>
            <button className="primary-button" type="button" disabled title="Connect a calendar to add events"><span aria-hidden="true">＋</span> Add event</button>
          </div>
        </header>

        <section className="welcome" aria-labelledby="welcome-title">
          <div>
            <p className="eyebrow">Your family, in sync</p>
            <h2 id="welcome-title">A little more room to breathe.</h2>
            <p>Everyone&apos;s plans, all in one place. Ask Hearth to help find a time, remember a detail, or bring the day together.</p>
          </div>
          <div className="welcome-art" aria-hidden="true">⌂</div>
        </section>

        <section id="calendar" aria-labelledby="week-title">
          <div className="section-heading">
            <h2 id="week-title">This week</h2>
            <a href="#calendar">September 27 – October 3 <span aria-hidden="true">⌄</span></a>
          </div>
          <div className="week-strip" aria-label="Week of September 27">
            {week.map(({ day, date, today }) => (
              <div className={`day-card${today ? " today" : ""}`} key={day} aria-current={today ? "date" : undefined}>
                <span>{day}</span><strong>{date}</strong>
              </div>
            ))}
          </div>
        </section>

        <div className="content-grid">
          <section className="panel schedule-panel" aria-labelledby="schedule-title">
            <div className="section-heading">
              <div><h2 id="schedule-title">Today&apos;s schedule</h2><p className="schedule-date">Wednesday, September 30</p></div>
              <button className="text-button" type="button">Day view <span aria-hidden="true">⌄</span></button>
            </div>
            {events.map((event) => (
              <article className="event-row" key={event.title}>
                <span className="event-time">{event.time}</span>
                <span className={`event-color ${event.color}`} aria-hidden="true" />
                <div className="event-details"><strong>{event.title}</strong><span>{event.detail}</span></div>
                <span className="event-person"><span className="avatar">{event.person}</span>{event.person === "A" ? "Alex" : event.person === "M" ? "Morgan" : "Jamie"}</span>
              </article>
            ))}
          </section>

          <aside className="panel assistant-panel" aria-labelledby="assistant-title">
            <div className="assistant-head">
              <span className="assistant-icon" aria-hidden="true">✳</span>
              <div><h3 id="assistant-title">A note from Hearth</h3><span>Here to make the day easier</span></div>
            </div>
            <div className="suggestion">
              <span className="suggestion-tag">A heads-up</span>
              <p>Soccer practice ends at 4:30. There&apos;s a 30-minute window before groceries—want me to look for a pickup swap?</p>
            </div>
            <div className="suggestion">
              <span className="suggestion-tag" style={{ background: "var(--coral)", color: "#9b6855" }}>Coming up</span>
              <p>Dinner with Nana tonight. The photo album is on your list from last week.</p>
            </div>
            <form className="assistant-input" action="#assistant-title">
              <input aria-label="Ask Hearth" placeholder="Connect a calendar to ask Hearth…" disabled />
              <button type="submit" aria-label="Send message" disabled>↑</button>
            </form>
            <p className="footer-note">Preview only — calendars and assistant services are not connected yet. Calendar updates must be confirmed by a household member.</p>
          </aside>
        </div>
      </main>
    </div>
  );
}
