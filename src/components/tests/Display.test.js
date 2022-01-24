import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Display from './../Display';
import fetchShow from '../../api/fetchShow';


jest.mock('./api/fetchShow');

test('renders without errors with no props', ()=>{
    render(<Display />)
});

test('renders Show component when the button is clicked ', async ()=>{
    fetchShow.mockResolvedValueOnce({
        data: [{
        name: 'Stranger Things',
        summary: 'A town with some kids',
        seasons: [
            {id: 1, name: 'Season 1', episode: []},
            {id: 2, name: 'Season 2', episode: []},
            {id: 3, name: 'Season 3', episode: []}
                ]}
            ]
    });

    render(<Display />);

    const button = screen.getByRole('button');

    userEvent.click(button);

    const season = await screen.findAllByTestId('seasons');

    expect(season).toHaveLength(3)
});

test('renders show season options matching your data when the button is clicked', ()=>{
    render(<Display/>);

    const season = screen.queryByText(/press to get show data/i);
    const button = screen.queryByRole('button');

    userEvent.click(button);

    expect(season).toBeInTheDocument();
    expect(season).toBeTruthy();

});
