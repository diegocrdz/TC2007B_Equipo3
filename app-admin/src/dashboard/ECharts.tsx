import * as React from 'react';
import { ListBase, WithListContext } from 'react-admin';
import * as echarts from 'echarts';

type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

export const EChart = () => (
  <ListBase
    resource="posts"
    disableSyncWithLocation
    perPage={100}
  >
    <WithListContext<Post>
      render={({ data, isLoading }) => <BarChart data={data} isLoading={isLoading} />}
    />
  </ListBase>
);

const BarChart: React.FC<{ data?: Post[]; isLoading?: boolean }> = ({ data = [], isLoading }) => {
  const chartRef = React.useRef<HTMLDivElement | null>(null);
  const chartInstanceRef = React.useRef<echarts.EChartsType | null>(null);

  // Init & cleanup
  React.useEffect(() => {
    if (!chartRef.current) return;

    const instance = echarts.init(chartRef.current);
    chartInstanceRef.current = instance;

    // Mantén la gráfica responsive
    const ro = new ResizeObserver(() => {
      instance.resize();
    });
    ro.observe(chartRef.current);

    return () => {
      ro.disconnect();
      instance.dispose();
      chartInstanceRef.current = null;
    };
  }, []);

  // Set options when data changes
  React.useEffect(() => {
    if (!chartInstanceRef.current) return;

    if (isLoading) {
      chartInstanceRef.current.showLoading();
      return;
    } else {
      chartInstanceRef.current.hideLoading();
    }

    // Contar posts por userId
    const counts: Record<number, number> = {};
    for (const p of data) {
      counts[p.userId] = (counts[p.userId] || 0) + 1;
    }

    // Ordenar userIds numéricamente
    const userIds = Object.keys(counts)
      .map((k) => Number(k))
      .sort((a, b) => a - b);

    const option: echarts.EChartsOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: (params: any) => {
          const p = params?.[0];
          return `${p?.name}<br/>Posts: ${p?.value ?? 0}`;
        },
      },
      legend: { show: false },
      grid: { left: 40, right: 20, top: 20, bottom: 40 },
      xAxis: {
        type: 'category',
        data: userIds.map((u) => `User ${u}`),
        axisLabel: { rotate: 0 },
      },
      yAxis: { type: 'value', name: 'Posts' },
      series: [
        {
          name: 'Posts',
          type: 'bar',
          data: userIds.map((u) => counts[u] ?? 0),
          emphasis: { focus: 'series' },
        },
      ],
      // Opcional: animación suave
      animationDuration: 600,
      animationEasing: 'quadraticOut',
    };

    chartInstanceRef.current.setOption(option, true);
  }, [data, isLoading]);

  return (
    <div
      ref={chartRef}
      style={{
        height: 320,
        width: '100%',
        // útil si el contenedor padre usa flex
        minWidth: 300,
      }}
    />
  );
};
