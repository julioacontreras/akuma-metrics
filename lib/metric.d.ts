import { Metric } from 'akuma-microservice-framework/lib/adapters/action-protocol/metrics/metric';
export declare class MetricService implements Metric {
    widgets: Map<string, any>;
    metricsContentType: string;
    constructor();
    startTime(): number;
    finishTime(start: number): number;
    createCounterRequestTotalOperators(): void;
    createHistogramRequestDuration(): void;
    calculeHistogramRequestDuration(start: number, action: string): void;
    sumOneRequest(action: string): void;
    getMetrics(): Promise<any>;
}
