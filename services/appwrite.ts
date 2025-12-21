import {Client, Databases, ID, Query, TablesDB} from "react-native-appwrite"


const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const TABLE_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
        .setEndpoint('https://sfo.cloud.appwrite.io/v1')
        .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new TablesDB(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
    try {
        const result = await database.listRows({
            databaseId: DATABASE_ID,
            tableId: TABLE_ID,
            queries: [Query.equal('searchTerm', query)]
        });
        if(result.rows.length > 0){
            const existingMovie = result.rows[0];

            await database.updateRow({
                databaseId: DATABASE_ID,
                tableId: TABLE_ID,
                rowId: existingMovie.$id,
                data: {
                    count: existingMovie.count + 1
                }
            })
        } else {
                database.createRow({
                    databaseId: DATABASE_ID,
                    tableId: TABLE_ID,
                    rowId: ID.unique(),
                    data: {
                        searchTerm: query,
                        movie_id: movie.id,
                        count: 1,
                        title: movie.title,
                        poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    }
                })
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
    
    
    // console.log(result)
}