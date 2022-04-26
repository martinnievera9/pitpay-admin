<?php
/**
 * Pit Pay functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package WordPress
 * @subpackage PitPay
 * @since Pit Pay 1.0
 */

/**
 * Pit Pay only works in WordPress 4.7 or later.
 */
add_theme_support( 'menus' );

function register_theme_nav_menus() {
	register_nav_menus(
		[
			'header-menu' => esc_html__( 'Header Menu' ),
			'footer-menu' => esc_html__( 'Footer Menu' ),
		]
	);
}
add_action( 'init', 'register_theme_nav_menus' );

/**
 * Enqueue scripts and styles.
 */
function pitpay_scripts() {
	wp_enqueue_style( 'pitpay-style', get_stylesheet_uri(), array(), wp_get_theme()->get( 'Version' ) );
}
add_action( 'wp_enqueue_scripts', 'pitpay_scripts' );

function register_custom_post_type () {
	$labels = array(
		'name'               => esc_html__( 'Faqs', 'pitpay' ),
		'singular_name'      => esc_html__( 'Faq', 'pitpay' ),
		'add_new'            => esc_html__( 'New Faq', 'pitpay' ),
		'add_new_item'       => esc_html__( 'Add New Faq', 'pitpay' ),
		'edit_item'          => esc_html__( 'Edit Faq', 'pitpay' ),
		'new_item'           => esc_html__( 'New Faq', 'pitpay' ),
		'all_items'          => esc_html__( 'All Faqs', 'pitpay' ),
		'view_item'          => esc_html__( 'View Faq', 'pitpay' ),
		'search_items'       => esc_html__( 'Search Faqs', 'pitpay' ),
		'not_found'          => esc_html__( 'No Faqs found.', 'pitpay' ),
		'menu_name'          => esc_html__( 'Faqs', 'pitpay' ),
		'not_found_in_trash' => esc_html__( 'No Faq found in Trash', 'pitpay' ),
		'parent'             => esc_html__( 'Parent Faq', 'pitpay' ),
	);
	$args   = array(
		'labels'        => $labels,
		'public'        => true,
		'menu_icon'     => 'dashicons-lightbulb',
		'hierarchical'  => true,
		'menu_position' => 7,
		'rewrite'       => array(
			'slug'       => 'faq',
			'with_front' => false,
		),
		'supports'      => array(
			'title',
			'page-attributes',
			'editor',
		),
		'show_in_rest'  => true,
	);
	register_post_type( 'faqs', $args );
}

/**
 * Registers the Sample Custom Post Type
 */
add_action( 'init', 'register_custom_post_type' );

/**
 * Registers the Specification Taxonomy
 */
function register_custom_taxonomies() {
	$labels = [
		'name'                       => esc_html__( 'Faq Categories', 'pitpay' ),
		'singular_name'              => esc_html__( 'Faq Category', 'pitpay' ),
		'search_items'               => esc_html__( 'Search Faq Categories', 'pitpay' ),
		'popular_items'              => esc_html__( 'Popular Faq Categories', 'pitpay' ),
		'all_items'                  => esc_html__( 'All Faq Categories', 'pitpay' ),
		'edit_item'                  => esc_html__( 'Edit Faq Categories', 'pitpay' ),
		'update_item'                => esc_html__( 'Update Faq Categories', 'pitpay' ),
		'add_new_item'               => esc_html__( 'Add New Faq Categories', 'pitpay' ),
		'new_item_name'              => esc_html__( 'New Faq Categories Name', 'pitpay' ),
		'separate_items_with_commas' => esc_html__( 'Separate Faq Categories with commas', 'pitpay' ),
		'add_or_remove_items'        => esc_html__( 'Add or remove Faq Category', 'pitpay' ),
		'choose_from_most_used'      => esc_html__( 'Choose from the most used Faq Catigories', 'pitpay' ),
		'not_found'                  => esc_html__( 'No Faq Categories found', 'pitpay' ),
		'menu_name'                  => esc_html__( 'Faq Categories', 'pitpay' ),
	];

	$args = array(
		'hierarchical'          => true,
		'labels'                => $labels,
		'show_ui'               => true,
		'show_admin_column'     => true,
		'update_count_callback' => '_update_post_term_count',
		'query_var'             => true,
		'rewrite'               => [ 'slug' => 'faq-category' ],
		'show_in_rest'          => true,
		'rest_base'             => 'faq-category',
		'rest_controller_class' => 'WP_REST_Terms_Controller',
	);

	register_taxonomy( 'faq-category', 'faqs', $args );
}

add_action( 'init', 'register_custom_taxonomies' );

function inline_svg( $name, $force = false ) {

	$stored_name = 'stored_svg_' . $name;

	$svg = get_transient( $stored_name );

	if ( false === $svg || true === $force ) {

		$svg_path = get_template_directory() . '/svg/' . $name . '.svg';

		if ( ! file_exists( $svg_path ) ) {
			return false;
		}

		$svg = file_get_contents( $svg_path );

		set_transient( $stored_name, $svg, HOUR_IN_SECONDS * 24 );
	}

	return $svg;
}

add_action( 'customize_register', 'home_section', 1 );

function home_section( $wp_customize ) {
	$wp_customize->add_setting( 'your_theme_logo' );
	$wp_customize->add_setting( 'help_form_url' );

	$wp_customize->add_control(
		'your_theme_logo',
		array(
			'label'    => 'Hero Section Title',
			'section'  => 'title_tagline',
			'settings' => 'your_theme_logo',
			'type'     => 'text',
		)
	);

	$wp_customize->add_control(
		'help_form_url',
		array(
			'label'    => 'Help Form URL',
			'section'  => 'title_tagline',
			'settings' => 'help_form_url',
			'type'     => 'text',
		)
	);
}
