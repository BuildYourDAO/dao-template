import React, { useRef } from 'react';
// import * as d3 from 'd3';

interface AnimatedPieChartProps {
  data: { label: string; value: number }[];
}

const AnimatedPieChart: React.FC<AnimatedPieChartProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  console.log('data', data);
  // useEffect(() => {
  //   // Add D3 pie chart logic here
  //   // ...

  //   // Example code (you may need to customize based on your specific pie chart implementation)
  //   const width = 300;
  //   const height = 300;
  //   const radius = Math.min(width, height) / 2;

  //   const color = d3.scaleOrdinal(d3.schemeCategory10);

  //   const pie = d3.pie<{ label: string; value: number }>().value((d: { value: any; }) => d.value);

  //   const arc = d3.arc().innerRadius(0).outerRadius(radius);

  //   const svg = d3
  //     .select(svgRef.current)
  //     .attr('width', width)
  //     .attr('height', height)
  //     .append('g')
  //     .attr('transform', `translate(${width / 2},${height / 2})`);

  //   const slices = svg.selectAll('.slice').data(pie(data));

  //   slices
  //     .enter()
  //     .append('path')
  //     .attr('class', 'slice')
  //     .attr('fill', (d: any, i: any) => color(i))
  //     .attr('d', arc);

  //   slices.exit().remove();
  // }, [data]);

  return <svg ref={svgRef} />;
};

export default AnimatedPieChart;
