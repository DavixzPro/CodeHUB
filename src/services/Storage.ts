export interface Strategy {

    name: string;

    code: string;

}

const KEY = "codehub_strategies";

export function loadStrategies(): Strategy[] {

    const data = localStorage.getItem(KEY);

    if (!data) return [];

    return JSON.parse(data);

}

export function saveStrategy(strategy: Strategy) {

    const list = loadStrategies();

    const existing = list.findIndex(s => s.name === strategy.name);

    if (existing >= 0) {

        list[existing] = strategy;

    } else {

        list.push(strategy);

    }

    localStorage.setItem(KEY, JSON.stringify(list));

}

export function deleteStrategy(name: string) {

    const list = loadStrategies().filter(s => s.name !== name);

    localStorage.setItem(KEY, JSON.stringify(list));

}

export function updateStrategy(name: string, code: string) {

    const strategies = loadStrategies();

    const index = strategies.findIndex(s => s.name === name);

    if (index === -1) return;

    strategies[index].code = code;

    localStorage.setItem(
        KEY,
        JSON.stringify(strategies)
    );

}