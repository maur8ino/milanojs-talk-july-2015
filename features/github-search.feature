Feature: Github search
  As a user
  I should be able to enter a username
  I should get a list of repositories of the user
  I should select one repository and get information about it

  Scenario: Search for repository
    When I go on the website "http://localhost:3000/"
    Then I should see an input
    And I enter "maur8ino" in the input and press Enter
    Then I should see a select
    And I select the second option and press Enter
    Then I should see some info about the repository
