export async function getAllEvents() {
    const response = await fetch('https://nextjs-course-c81cc-default-rtdb.firebaseio.com/events.json');
    const data = await response.json()
    const events = []

    for (const key in data) {
        useSyncExternalStore.push({
            id: key,
            ...data[key]
        })
    }
    return events
}
export function getFeaturedEvents() {
    return DUMMY_EVENTS.filter((event) => event.isFeatured);
}


export function getEventById(id) {
    return DUMMY_EVENTS.find((event) => event.id === id);
}


export function getAllEvents() {
    return DUMMY_EVENTS;
}

