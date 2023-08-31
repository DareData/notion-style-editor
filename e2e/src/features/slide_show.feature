Feature: Slide show

	Background:
		Given I open the editor page

	Scenario: adds a new slide show
		When I click on "slide_show" icon in menu bar
		And I fill add slide show url input with "https://docs.google.com/presentation/d/e/2PACX-1vT0nMAZIdwHy865xDgMvB4gHezfuYURPP9naakB8VDhdRBl0S96i-ixydydXUTZ-8HjTMmxoeQ4YP_M/pub?start=false&loop=false&delayms=3000" text
		And I click "Save" button
		Then I check that editor contains "https://docs.google.com/presentation/d/e/2PACX-1vT0nMAZIdwHy865xDgMvB4gHezfuYURPP9naakB8VDhdRBl0S96i-ixydydXUTZ-8HjTMmxoeQ4YP_M/pub?start=false&loop=false&delayms=3000" link with "https://docs.google.com/presentation/d/e/2PACX-1vT0nMAZIdwHy865xDgMvB4gHezfuYURPP9naakB8VDhdRBl0S96i-ixydydXUTZ-8HjTMmxoeQ4YP_M/pub?start=false&loop=false&delayms=3000" href attribute
