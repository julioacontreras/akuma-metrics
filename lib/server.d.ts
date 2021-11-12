import { Metric } from 'akuma-microservice-framework/lib/adapters/action-protocol/metrics/metric';
export interface Config {
    port: string;
}
export declare const initializeMetrics: (config: Config, metric: Metric) => void;
