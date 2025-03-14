const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// @route   GET /api/health-data
// @desc    Get user health data
// @access  Private
router.get('/', auth, (req, res) => {
  try {
    // Mock health data (in a real app, this would come from a database)
    const healthData = {
      userId: req.user.id,
      metrics: {
        sleep: {
          averageHours: 7.2,
          quality: 'Good',
          recentTrend: 'Improving'
        },
        activity: {
          stepsPerDay: 8500,
          activeMinutes: 45,
          recentTrend: 'Stable'
        },
        nutrition: {
          calorieIntake: 2100,
          waterConsumption: '2.5L',
          recentTrend: 'Needs improvement'
        }
      },
      recommendations: [
        'Try to reduce screen time 1 hour before bed',
        'Consider adding 15 minutes of meditation to your morning routine',
        'Increase protein intake by 10-15g per day'
      ]
    };

    res.json(healthData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router; 