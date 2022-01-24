import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Show from './../Show';

const testShow = {
    name: "Stranger Things",
    summary: "A town in the 80's thats more than it seems.",
    seasons: [{
        id: 1, 
        name: 'Season 3',
        episodes: []
    }]
}

test('renders without errors', ()=>{
    render(<Show />);
});

test('renders Loading component when prop show is null', () => {
    render(<Show show={null} />);

    const loading = screen.getAllByTestId('loading-container');

    expect(loading).toBeInTheDocument();
});


test('renders same number of options seasons are passed in', ()=>{
    render(<Show show={testShow}/>);

    const seasons = screen.getAllByTestId('season-option');

    expect(seasons).toHaveLength(testShow.seasons.length);
});

test('handleSelect is called when an season is selected', () => {
    const mockHandleSelect = jest.fn();

    render(<Show />);

    const handleSelect = screen.queryByLabelText(/select a season/i);

    userEvent.selectOptions(handleSelect, ['0']);

    expect(mockHandleSelect).toHaveBeenCalledTimes(1)
});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {
    const {rerender} = render(<Show show={[]} />);

    let season = screen.queryAllByTestId('seasons');

    expect(season).toHaveLength(0);

    rerender(<Show selectedSeason={testShow} />);

    season = screen.queryAllByTestId('seasons');

    expect(season).toHaveLength(testShow.seasons.length);
});
