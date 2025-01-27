Feature: Studio App 

  Scenario Outline: As a user, I can log into the secure area

    Given The app is displaying the login page with credentials included
    When I click the Continue button
    Then I should be redirected to
