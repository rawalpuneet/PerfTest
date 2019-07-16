import com.marklogic.client.DatabaseClient;
import com.marklogic.client.DatabaseClientFactory;
import com.marklogic.client.DatabaseClientFactory.DigestAuthContext;


public class QueryTest {

    // Assume "client" is a previously created DatabaseClient object.
    private static String EX_DIR = "/your/directory/here";
    private static DataMovementManager dmm =
            client.newDataMovementManager();

// ...

    public static void exportByQuery() {
        // Construct a directory query with which to drive the job.
        QueryManager qm = client.newQueryManager();
        StructuredQueryBuilder sqb = qm.newStructuredQueryBuilder();
        StructuredQueryDefinition query = sqb.directory(true, "/dmsdk/");

        // Create and configure the batcher
        QueryBatcher batcher = dmm.newQueryBatcher(query);
        batcher.onUrisReady(
                new ExportListener()
                        .onDocumentReady(doc-> {
                            String uriParts[] = doc.getUri().split("/");
                            try {
                                Files.write(
                                        Paths.get(EX_DIR, "output",
                                                uriParts[uriParts.length - 1]),
                                        doc.getContent(
                                                new StringHandle()).toBuffer());
                            } catch (Exception e) {
                                e.printStackTrace();
                            }
                        }))
                .onQueryFailure( exception -> exception.printStackTrace() );

        dmm.startJob(batcher);

        // Wait for the job to complete, and then stop it.
        batcher.awaitCompletion();
        dmm.stopJob(batcher);
    }

}
