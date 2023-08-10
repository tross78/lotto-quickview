import axios from "axios";

// A functional approach to the API call
export const fetchData = async ({ 
  api_url, 
  endpoint, 
  company_id, 
  max_draw_count, 
  product_filter 
}) => {
    // Ensure the API URL has a trailing slash
    const finalApiUrl = api_url.endsWith("/") ? api_url : `${api_url}/`;

    try {
        const response = await axios.post(`${finalApiUrl}${endpoint}`, {
            CompanyId: company_id,
            MaxDrawCount: max_draw_count,
            OptionalProductFilter: product_filter
        }, {
            headers: {
                Accept: "application/json"
            }
        });

        if (response.status === 200) {
            const responseData = response.data;
            const drawsData = responseData.DrawResults;
            
            const groupedObject = drawsData.reduce((acc, draw) => {
                if (!acc[draw.ProductId]) {
                    acc[draw.ProductId] = [];
                }
                acc[draw.ProductId].push(draw);
                return acc;
            }, {});
            
            // Convert the grouped object to an array of objects
            const groupedArray = Object.keys(groupedObject).map(productId => ({
                productId: productId,
                draws: groupedObject[productId]
            }));
            
        // Transform the draws inside each item in groupedArray
        const transformedGroupedArray = groupedArray.map(item => {
            // Sort and reverse the draws
            const transformedDraws = item.draws.sort((a, b) => b.DrawNumber - a.DrawNumber).reverse();

            // Map through the transformedDraws to create a new array
            const mappedDraws = transformedDraws.map((draw, index) => ({
                ...draw, 
                isActive: index === transformedDraws.length - 1
            }));

            return {
                ...item,
                draws: mappedDraws
            };
        });

        return transformedGroupedArray;

        }

        throw new Error('API response was not OK.');
    } catch (error) {
        throw new Error(`Failed to fetch data: ${error.message}`);
    }
};
