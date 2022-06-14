package com.ktxdev.bugtracker;

import com.ktxdev.bugtracker.integration.*;
import org.junit.platform.suite.api.SelectClasses;
import org.junit.platform.suite.api.Suite;

@Suite
@SelectClasses({
        UserIntegrationTests.class,
        AuthenticationIntegrationTests.class,
        ProjectIntegrationTests.class,
        TicketIntegrationTests.class,
        CommentIntegrationTests.class
})
class BugTrackerApplicationTestSuite {
}
