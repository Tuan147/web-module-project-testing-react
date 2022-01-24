import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Episode from './../Episode';

const testEpisode = {
    id: 1,
    name: "Chapter One: The Vanishing of Will Byers",
    image: "https://static.tvmaze.com/uploads/images/medium_landscape/342/855786.jpg",
    season: 1,
    number: 1,
    summary: 'A small town with a lot to hide',
    runtime: 1
};

const testEpisodeImg = {
    id: 1,
    name: 'Chapter Five: Dig Dug',
    image: null,
    season: 2,
    number: 5,
    summary: 'Jim is trapped in the Upside Down...',
    runtime: 1
}


test("renders without error", () => {
    <Episode />
});

test("renders the summary test passed as prop", ()=>{
    render(<Episode episode={testEpisode}/>);

    const summary = screen.getByText(`${testEpisode.summary}`);

    expect(summary).toBeInTheDocument();
    expect(summary).toBeTruthy();
    expect(summary).toHaveTextContent(`${testEpisode.summary}`);
});

test("renders default image when image is not defined", ()=>{
    render(<Episode />);

    const altImgText = screen.getByAltText('./stranger_things.png');

    expect(altImgText).toBeInTheDocument();
    expect(altImgText.alt).toEqual('./stranger_things.png');
    expect(altImgText).toBeTruthy();

});
