import { Icon } from '@iconify/react';
import { useMemo } from 'react';

const RatingStars = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating); // stars before the decimal point
  const decimal = rating % 1; // stars after the decimal point

  const quarterStar = decimal >= 0.12 && decimal < 0.39;
  const halfStar = decimal >= 0.40 && decimal < 0.74;
  const threeQuarterStar = decimal >= 0.75;
  const emptyStars = 5 - fullStars - (halfStar || quarterStar || threeQuarterStar ? 1 : 0); // Empty starts, total 5

  const starIcons = useMemo(() => {
    const stars = [];

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Icon key={`full-${i}`} icon="fluent:star-24-filled" className='text-sm text-yellow-400'/>);
    }

    // Quarter star
    if (quarterStar) {
      stars.push(<Icon key={`quarter`} icon="fluent:star-one-quarter-24-regular" className='text-sm text-yellow-400'/>);
    }

    // Half star
    if (halfStar && !quarterStar) {
      stars.push(<Icon key={`half`} icon="fluent:star-half-24-regular" className='text-sm text-yellow-400'/>);
    }

    if(threeQuarterStar && !quarterStar) {
      stars.push(<Icon key={`threeQuarter`} icon="fluent:star-three-quarter-24-regular" className='text-sm text-yellow-400'/>);
    }

    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Icon key={`empty-${i}`} icon="fluent:star-24-regular" className='text-sm text-yellow-400'/>);
    }

    return stars;
  }, [fullStars, halfStar, quarterStar, emptyStars, threeQuarterStar]);

  return <div style={{ display: 'flex' }}>{starIcons}</div>;
};

export default RatingStars;
