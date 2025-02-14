import { getFeaturedEvents } from '../dummy-data';
import EventList from '../components/events/event-list';
// import { getFeaturedEvents } from '../helpers/api-util'
function HomePage() {
  const featuredEvents = getFeaturedEvents();

  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents()
  return {
    props: {
      events: featuredEvents
    },
    revalidate: 1800
  }
}

export default HomePage;
