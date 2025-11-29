export default function EventList({ events }) {
  if (!events || events.length === 0) {
    return <p className=" mt3 text-gray-500 italic">Check back soon for events! <a href="https://www.meetup.com/ja-JP/kyoto-tech-meetup"> Join our meetup group here to get updates.</a></p>;
  }

  // Group by month string (using Tokyo timezone for consistency)
  const groups = events.reduce((acc, evt) => {
    const d = new Date(evt.start);
    const monthLabel = d.toLocaleString("en-US", {
      timeZone: "Asia/Tokyo",
      month: "long",
      year: "numeric"
    });
    acc[monthLabel] = acc[monthLabel] || [];
    acc[monthLabel].push(evt);
    return acc;
  }, {});

  const orderedMonths = events
    .map(evt => {
      const d = new Date(evt.start);
      const monthLabel = d.toLocaleString("en-US", {
        timeZone: "Asia/Tokyo",
        month: "long",
        year: "numeric"
      });
      return { monthLabel, date: d };
    })
    .reduce((seen, curr) => {
      if (!seen.find(item => item.monthLabel === curr.monthLabel)) {
        seen.push(curr);
      }
      return seen;
    }, [])
    .sort((a, b) => a.date - b.date)
    .map(item => item.monthLabel);

  return (
    <div className="space-y-8">
      {orderedMonths.map(monthLabel => (
        <div key={monthLabel} className="space-y-4">
          <h3 className="text-2xl font-semibold text-slate-900">{monthLabel}</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {groups[monthLabel].map(event => (
              <li key={event.link}>
                <a
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 border rounded-xl shadow-sm flex gap-4 items-start md:items-center block hover:shadow-md transition-shadow no-underline h-full"
                  style={{
                    color: "var(--accent)",
                    textDecoration: "none",
                    borderColor: "var(--accent)"
                  }}
                >
                  {event.image ? (
                    <div className="w-1/3 min-w-[120px]">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full max-h-32 rounded-lg object-cover"
                        loading="lazy"
                      />
                    </div>
                  ) : null}
                  <div className="flex-1 min-w-0">
                    <div className="text-xl font-semibold">
                      {event.title}
                    </div>
                    <p className="text-sm text-gray-500 mt-1 space-x-2">
                      <span>
                        {new Date(event.start).toLocaleString("en-US", {
                          timeZone: "Asia/Tokyo",
                          month: "long",
                          day: "numeric",
                          year: "numeric"
                        })}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span>
                        {new Date(event.start).toLocaleTimeString("en-US", {
                          timeZone: "Asia/Tokyo",
                          hour12: false,
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                        {event.endTime
                          ? ` – ${new Date(event.endTime).toLocaleTimeString("en-US", {
                              timeZone: "Asia/Tokyo",
                              hour12: false,
                              hour: "2-digit",
                              minute: "2-digit"
                            })}`
                          : ""}
                      </span>
                    </p>
                    <div className="text-sm text-gray-700 mt-2 space-y-1">
                      <div className="font-medium text-slate-900">
                        {event.venue?.name ?? "Venue TBA"}
                      </div>
                      {event.venue?.address ? (
                        <div className="text-gray-600">{event.venue.address}</div>
                      ) : null}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-gray-600">
                      <span>{event.goingCount ?? 0} going</span>
                      <span>· {event.interestedCount ?? 0} interested</span>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
