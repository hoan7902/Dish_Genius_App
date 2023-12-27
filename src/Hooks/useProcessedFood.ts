import { useMemo } from 'react';

interface ProcessedFood {
  thumbnail_url: string;
  name: string;
  total_time_tier: { display_tier: string };
  description: string;
  sections?: {
    components?: {
      ingredient: { name: string }[];
    }[];
  }[];
  instructions: { display_text: string }[];
  // Add more properties if required based on your 'food' object structure
}

const useProcessedFood = (food: any): ProcessedFood => {
  const processedFood = useMemo(() => {
    // Perform your processing logic here
    const thumbnailUrl = food.thumbnail_url || ''; // Example processing
    const name = food.name || '';
    const totalTimeTier = food.total_time_tier || { display_tier: '30 mins' };
    const description = food.description || '';
    const sections = food.sections || [];
    const instructions = food.instructions || [];
    const urlVideo = food.video_url;
    // Map ingredients and instructions to a simpler format
    const processedIngredients = sections.flatMap(section => section.components.
      filter(component => component.measurements[0].quantity != 0 && component.measurements[0].unit.name !== "")
      .map(component => `${component.ingredient.name} (${component.measurements[0].quantity} ${component.measurements[0].unit.name})`) || []);
    const processedInstructions = instructions.map(instruction => ({ display_text: instruction.display_text || '' }));

    return {
      thumbnailUrl,
      name,
      totalTimeTier,
      description,
      ingredients: processedIngredients,
      instructions: processedInstructions,
      urlVideo,
      // Add more processed properties as needed based on your 'food' object structure
    };
  }, [food]);

  return processedFood;
};

export default useProcessedFood;
