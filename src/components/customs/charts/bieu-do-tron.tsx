import { Skeleton } from '@/components/ui/skeleton';
import { PolarAngleAxis, RadialBar, RadialBarChart } from 'recharts';

interface BieuDoTronProps {
  completed: number;
  total: number;
  color: string;
}

export const BieuDoTron = ({ completed, total, color }: BieuDoTronProps) => {
  const percentage = (completed / total) * 100;
  const chartData = [{ value: percentage, fill: color }];

  return (
    <div className='relative w-[100px] h-[100px]'>
      {percentage ? (
        <RadialBarChart
          width={100}
          height={100}
          cx='50%'
          cy='50%'
          innerRadius='85%'
          outerRadius='100%'
          barSize={10}
          data={chartData}
          startAngle={90}
          endAngle={-270}
        >
          <PolarAngleAxis type='number' domain={[0, 100]} tick={false} axisLine={false} />
          <RadialBar dataKey='value' background={{ fill: '#e5e5e5' }} cornerRadius={10} />
        </RadialBarChart>
      ) : (
        <Skeleton className='h-24 w-24 rounded-full' />
      )}

      <div className='absolute inset-0 flex flex-col items-center justify-center'>
        {percentage ? <span className='font-bold text-foreground'>{percentage.toFixed(1)}%</span> : ''}
      </div>
      <div></div>
    </div>
  );
};
