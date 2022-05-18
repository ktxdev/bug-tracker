package com.ktxdev.bugtracker;

import com.ktxdev.bugtracker.integration.ProjectIntegrationTests;
import com.ktxdev.bugtracker.integration.TicketIntegrationTests;
import com.ktxdev.bugtracker.integration.UserIntegrationTests;
import org.junit.platform.suite.api.SelectClasses;
import org.junit.platform.suite.api.Suite;

@Suite
@SelectClasses({
        UserIntegrationTests.class,
        ProjectIntegrationTests.class,
        TicketIntegrationTests.class
})
class BugTrackerApplicationTestSuite {
}
