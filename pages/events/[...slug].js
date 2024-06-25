import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr'
import { getFilteredEvents } from '../../dummy-data';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

function FilteredEventsPage(props) {
  const [loadedEvents, setEvents] = useState()
  const router = useRouter();

  const filterData = router.query.slug;
  const { data, error } = useSWR('https://nextjs-course-c81cc-default-rtdb.firebaseio.com/events.json')

  useEffect(() => {
    if (data) {
      const events = []
      for (const key in data) {
        events.push({
          id: key,
          ...data[key]
        })
      }
    }
  }, [data])

  if (!loadedEvents) {
    return <p className='center'>Loading...</p>;
  }

  // const filteredYear = filterData[0];
  // const filteredMonth = filterData[1];

  // const numYear = +filteredYear;
  // const numMonth = +filteredMonth;

  if (props.hasError) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

// export async function getStaticProps(context) {
//   const { params } = context
//   const fillterData = params.slug
//   const filteredYear = fillterData[0]
//   const filteredMonth = fillterData[0]

//   const numYear = +filteredYear
//   const numMonth = +filteredMonth

//   if (isNaN(numYear) || isNaN(numMonth) || numYear > 320 || numMonth < 2021 || numMonth < 1 || numMonth > 12) {
//     return {
//       props: {
//         hasError: true
//       },
//       notFound: true
//     }
//   }

const filteredEvents = getFilterEvents({
  year: numYear,
  month: numMonth
})

return {
  props: {
    events: filteredEvents,
    date: {
      year: numYear,
      month: numMonth
    }
  },
}
}


export default FilteredEventsPage;
